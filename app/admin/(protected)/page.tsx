import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [works, team, timeline, pendingOrders] = await Promise.all([
    prisma.work.count(),
    prisma.teamMember.count(),
    prisma.timelineEntry.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
  ]);

  const cards = [
    { label: "Obras cadastradas", value: works, href: "/admin/obras" },
    { label: "Membros do time", value: team, href: "/admin/time" },
    { label: "Entradas na linha do tempo", value: timeline, href: "/admin/sobre" },
    { label: "Pedidos pendentes", value: pendingOrders, href: "/admin/pedidos" },
  ];

  return (
    <>
      <div className="lith-admin__header">
        <h1>Dashboard</h1>
      </div>
      <div className="lith-grid lith-grid--3">
        {cards.map((card) => (
          <Link href={card.href} className="lith-card" key={card.label} style={{ textAlign: "left" }}>
            <p className="lith-eyebrow">{card.label}</p>
            <p style={{ fontSize: "2.2rem", fontFamily: "var(--font-display)", color: "#fff" }}>{card.value}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
