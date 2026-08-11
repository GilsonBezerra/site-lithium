import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(team);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const { name, role, photoUrl, twitter, facebook, linkedin } = body;

  if (!name || !role || !photoUrl) {
    return NextResponse.json({ error: "name, role e photoUrl são obrigatórios" }, { status: 400 });
  }

  const member = await prisma.teamMember.create({
    data: { name, role, photoUrl, twitter: twitter || null, facebook: facebook || null, linkedin: linkedin || null },
  });

  return NextResponse.json(member, { status: 201 });
}
