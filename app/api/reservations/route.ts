import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { workId, email } = body || {};

  if (!workId || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  const work = await prisma.work.findUnique({ where: { id: workId } });
  if (!work) {
    return NextResponse.json({ error: "Obra não encontrada." }, { status: 404 });
  }

  await prisma.reservation.upsert({
    where: { workId_email: { workId, email } },
    update: {},
    create: { workId, email },
  });

  return NextResponse.json({ ok: true });
}
