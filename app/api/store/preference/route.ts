import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { prisma } from "@/lib/prisma";
import { PIX_ENABLED, isBuyable } from "@/lib/payment-config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type CartLine = { workId: string; quantity: number };

// Cria a Preference que o Payment Brick usa para inicializar (Pix + cartão).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { items, payerEmail } = (body || {}) as { items?: CartLine[]; payerEmail?: string };

  if (!items || !Array.isArray(items) || items.length === 0 || !payerEmail || !EMAIL_RE.test(payerEmail)) {
    return NextResponse.json({ error: "items e payerEmail (válido) são obrigatórios." }, { status: 400 });
  }

  const works = await prisma.work.findMany({ where: { id: { in: items.map((i) => i.workId) } } });
  const workById = new Map(works.map((w) => [w.id, w]));

  const lines: { work: (typeof works)[number]; quantity: number }[] = [];
  for (const item of items) {
    const work = workById.get(item.workId);
    const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
    if (!work || !isBuyable(work)) {
      return NextResponse.json({ error: `A obra "${work?.title ?? item.workId}" não está disponível para venda.` }, { status: 404 });
    }
    lines.push({ work, quantity });
  }

  const amount = lines.reduce((sum, l) => sum + Number(l.work.price) * l.quantity, 0);

  const order = await prisma.order.create({
    data: {
      payerEmail,
      amount,
      status: "PENDING",
      items: {
        create: lines.map((l) => ({
          workId: l.work.id,
          title: l.work.title,
          unitPrice: l.work.price!,
          quantity: l.quantity,
        })),
      },
    },
  });

  try {
    const preference = new Preference(mpClient);
    const result = await preference.create({
      body: {
        items: lines.map((l) => ({
          id: l.work.id,
          title: l.work.title,
          description: `${l.work.title} — Lithium Entertainment`,
          quantity: l.quantity,
          unit_price: Number(l.work.price),
          currency_id: "BRL",
        })),
        payer: { email: payerEmail },
        metadata: { order_id: order.id },
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
