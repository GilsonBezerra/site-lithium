import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { prisma } from "@/lib/prisma";
import { PAYMENT_ENABLED, PIX_ENABLED } from "@/lib/payment-config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  if (!PAYMENT_ENABLED) {
    return NextResponse.json({ error: "A loja ainda não está disponível." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const { orderId, paymentMethodId, payerEmail, token, installments, issuerId } = body || {};

  if (!orderId || !paymentMethodId || !payerEmail) {
    return NextResponse.json({ error: "Dados de pagamento incompletos." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
  if (!order || order.status !== "PENDING") {
    return NextResponse.json({ error: "Pedido não encontrado ou já processado." }, { status: 404 });
  }

  const description =
    order.items.length === 1
      ? order.items[0].title
      : `Pedido Lithium Entertainment (${order.items.length} itens)`;

  const payment = new Payment(mpClient);

  if (paymentMethodId === "pix") {
    if (!PIX_ENABLED) {
      return NextResponse.json({ error: "Pagamento via Pix não está disponível." }, { status: 403 });
    }

    const result = await payment.create({
      body: {
        transaction_amount: Number(order.amount),
        description,
        payment_method_id: "pix",
        payer: { email: payerEmail },
        metadata: { order_id: order.id },
        external_reference: order.id,
        notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentMethod: "PIX", mpPaymentId: String(result.id) },
    });

    return NextResponse.json({
      status: result.status,
      orderId: order.id,
      pixQrCode: result.point_of_interaction?.transaction_data?.qr_code,
      pixQrCodeBase64: result.point_of_interaction?.transaction_data?.qr_code_base64,
    });
  }

  // Cartão de crédito
  if (!token) {
    return NextResponse.json({ error: "Token do cartão ausente." }, { status: 400 });
  }

  const result = await payment.create({
    body: {
      transaction_amount: Number(order.amount),
      token,
      description,
      installments: installments || 1,
      payment_method_id: paymentMethodId,
      issuer_id: issuerId,
      payer: { email: payerEmail },
      metadata: { order_id: order.id },
      external_reference: order.id,
      notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: {
      paymentMethod: "CREDIT_CARD",
      mpPaymentId: String(result.id),
      status: result.status === "approved" ? "APPROVED" : order.status,
    },
  });

  if (result.status === "rejected") {
    return NextResponse.json({ error: "Pagamento recusado. Tente outro cartão." }, { status: 402 });
  }

  return NextResponse.json({ status: result.status, orderId: order.id });
}
