import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const member = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!member) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  return NextResponse.json(member);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const member = await prisma.teamMember.update({
    where: { id: params.id },
    data: {
      name: body.name,
      role: body.role,
      photoUrl: body.photoUrl || undefined,
      twitter: body.twitter || null,
      facebook: body.facebook || null,
      linkedin: body.linkedin || null,
      order: body.order ?? undefined,
    },
  });

  return NextResponse.json(member);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  await prisma.teamMember.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
