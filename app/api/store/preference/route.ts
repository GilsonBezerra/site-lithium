import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { prisma } from "@/lib/prisma";
import { PAYMENT_ENABLED, PIX_ENABLED } from "@/lib/payment-config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Cria a Preference que o Payment Brick usa para inicializar (Pix + cartão).
export async function POST(req: NextRequest) {
  if (!PAYMENT_ENABLED) {
    return NextResponse.json({ error: "A loja ainda não está disponível." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const { workId, payerEmail } = body || {};

  if (!workId || !payerEmail || !EMAIL_RE.test(payerEmail)) {
    return NextResponse.json({ error: "workId e payerEmail (válido) são obrigatórios." }, { status: 400 });
  }

  const work = await prisma.work.findUnique({ where: { id: workId } });
  if (!work || !work.saleEnabled || !work.price) {
    return NextResponse.json({ error: "Esta obra não está disponível para venda." }, { status: 404 });
  }

  const amount = Number(work.price);

  const order = await prisma.order.create({
    data: { workId: work.id, payerEmail, amount, status: "PENDING" },
  });

  try {
    const preference = new Preference(mpClient);
    const result = await preference.create({
      body: {
        items: [
          {
            id: work.id,
            title: work.title,
            description: `${work.title} — Lithium Entertainment`,
            quantity: 1,
            unit_price: amount,
            currency_id: "BRL",
          },
        ],
        payer: { email: payerEmail },
        metadata: { order_id: order.id, work_id: work.id },
        external_reference: order.id,
        payment_methods: {
          excluded_payment_types: [{ id: "ticket" }],
          excluded_payment_methods: PIX_ENABLED ? [] : [{ id: "pix" }],
          installments: 3,
        },
        back_urls: {
          success: `${SITE_URL}/loja/sucesso`,
          failure: `${SITE_URL}/loja/erro`,
          pending: `${SITE_URL}/loja/pendente`,
        },
        notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
        expires: true,
        expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      },
    });

    await prisma.order.update({ where: { id: order.id }, data: { mpPreferenceId: result.id } });

    return NextResponse.json({ preferenceId: result.id, orderId: order.id });
  } catch (err) {
    console.error("Erro ao criar preference do Mercado Pago:", err);
    await prisma.order.update({ where: { id: order.id }, data: { status: "REJECTED" } });
    return NextResponse.json({ error: "Não foi possível iniciar o pagamento. Tente novamente." }, { status: 500 });
  }
}
