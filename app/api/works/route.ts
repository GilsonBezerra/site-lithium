import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TYPES = ["COMIC", "BOOK", "GAME"];
const STATUSES = ["IN_DEVELOPMENT", "AVAILABLE"];

// GET pública — alimenta o portfólio/loja do site
export async function GET() {
  const works = await prisma.work.findMany({
    include: { credits: { orderBy: { order: "asc" } } },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(works);
}

// POST protegida — só admin cria obras novas
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const { title, type, status, description, coverImage, price, saleEnabled, featured, credits } = body;

  if (!title || !TYPES.includes(type) || !coverImage) {
    return NextResponse.json({ error: "title, type e coverImage são obrigatórios" }, { status: 400 });
  }
  if (status && !STATUSES.includes(status)) {
    return NextResponse.json({ error: "status inválido" }, { status: 400 });
  }
  if (saleEnabled && !price) {
    return NextResponse.json({ error: "Informe o preço para colocar a obra à venda" }, { status: 400 });
  }

  const work = await prisma.work.create({
    data: {
      title,
      type,
      status: status || "IN_DEVELOPMENT",
      description: description || null,
      coverImage,
      price: price ? Number(price) : null,
      saleEnabled: Boolean(saleEnabled),
      featured: Boolean(featured),
      credits: {
        create: (credits || [])
          .filter((c: { role?: string; name?: string }) => c.role && c.name)
          .map((c: { role: string; name: string }, i: number) => ({ role: c.role, name: c.name, order: i })),
      },
    },
    include: { credits: true },
  });

  return NextResponse.json(work, { status: 201 });
}
