import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const entry = await prisma.timelineEntry.findUnique({ where: { id: params.id } });
  if (!entry) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  return NextResponse.json(entry);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const entry = await prisma.timelineEntry.update({
    where: { id: params.id },
    data: {
      year: body.year || null,
      title: body.title,
      description: body.description || null,
      isCta: Boolean(body.isCta),
      order: body.order ?? undefined,
    },
  });

  return NextResponse.json(entry);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  await prisma.timelineEntry.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
