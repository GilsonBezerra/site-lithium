import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const work = await prisma.work.findUnique({
    where: { id: params.id },
    include: { credits: { orderBy: { order: "asc" } } },
  });
  if (!work) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  return NextResponse.json(work);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const { title, type, status, description, coverImage, price, saleEnabled, featured, order, credits } = body;

  const work = await prisma.$transaction(async (tx) => {
    if (credits) {
      await tx.workCredit.deleteMany({ where: { workId: params.id } });
    }
    return tx.work.update({
      where: { id: params.id },
      data: {
        title,
        type,
        status,
        description: description || null,
        coverImage: coverImage || undefined,
        price: price ? Number(price) : null,
        saleEnabled: Boolean(saleEnabled),
        featured: Boolean(featured),
        order: order ?? undefined,
        ...(credits
          ? {
              credits: {
                create: credits
                  .filter((c: { role?: string; name?: string }) => c.role && c.name)
                  .map((c: { role: string; name: string }, i: number) => ({ role: c.role, name: c.name, order: i })),
              },
            }
          : {}),
      },
      include: { credits: true },
    });
  });

  return NextResponse.json(work);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  await prisma.work.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
