import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { prisma } from "@/lib/prisma";

function verifySignature(timestamp: string | null, signature: string | null, requestId: string | null, dataId: string | null): boolean {
  if (!timestamp || !signature || !dataId) return false;

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > 300) return false;

  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return false;

  const parts = Object.fromEntries(signature.split(",").map((p) => p.split("=") as [string, string]));
  const receivedHash = parts.v1;
  if (!receivedHash) return false;

  const manifest = `id:${dataId};${requestId ? `request-id:${requestId};` : ""}ts:${timestamp};`;
  const expectedHash = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

  return receivedHash === expectedHash;
}

const APPROVED_ORDER_STATUS: Record<string, "APPROVED" | "REJECTED" | "PENDING" | "CANCELLED"> = {
  approved: "APPROVED",
  rejected: "REJECTED",
  cancelled: "CANCELLED",
  refunded: "CANCELLED",
  pending: "PENDING",
  in_process: "PENDING",
};

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const dataId = url.searchParams.get("data.id") || url.searchParams.get("id");
    const timestamp = req.headers.get("x-timestamp");
    const signature = req.headers.get("x-signature");
    const requestId = req.headers.get("x-request-id");

    if (!verifySignature(timestamp, signature, requestId, dataId)) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const topic = url.searchParams.get("type") || url.searchParams.get("topic");
    if (topic !== "payment" || !dataId) {
      return NextResponse.json({ ok: true });
    }

    const payment = new Payment(mpClient);
    const result = await payment.get({ id: dataId });

    const orderId = result.external_reference || (result.metadata as { order_id?: string } | undefined)?.order_id;
    if (!orderId) return NextResponse.json({ ok: true });

    const nextStatus = APPROVED_ORDER_STATUS[result.status || ""] || "PENDING";

    await prisma.order.updateMany({
      where: { id: orderId },
      data: { status: nextStatus, mpPaymentId: String(result.id) },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro ao processar webhook do Mercado Pago:", err);
    // Sempre 200 para o MP não ficar reenviando indefinidamente por erro nosso.
    return NextResponse.json({ ok: true });
  }
}
