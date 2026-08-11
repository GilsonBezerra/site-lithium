import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const timeline = await prisma.timelineEntry.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(timeline);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const { year, title, description, isCta } = body;

  if (!title) {
    return NextResponse.json({ error: "title é obrigatório" }, { status: 400 });
  }

  const entry = await prisma.timelineEntry.create({
    data: { year: year || null, title, description: description || null, isCta: Boolean(isCta) },
  });

  return NextResponse.json(entry, { status: 201 });
}
