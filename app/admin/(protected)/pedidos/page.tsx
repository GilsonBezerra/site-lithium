import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  REJECTED: "Recusado",
  CANCELLED: "Cancelado",
};

export default async function PedidosPage() {
  const orders = await prisma.order.findMany({
    include: { work: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <>
      <div className="lith-admin__header">
        <h1>Pedidos</h1>
      </div>
      <div className="lith-admin-list">
        {orders.map((order) => (
          <div className="lith-admin-row" key={order.id}>
            <div className="lith-admin-row__body">
              <p className="lith-admin-row__title">{order.work.title}</p>
              <p className="lith-admin-row__meta">
                {order.payerEmail} · R$ {String(order.amount)} · {new Date(order.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
            <span className={`lith-admin-status lith-admin-status--${order.status.toLowerCase()}`}>
              {STATUS_LABEL[order.status]}
            </span>
          </div>
        ))}
        {orders.length === 0 && <p className="lith-admin-empty">Nenhum pedido ainda. Essa lista vai se popular quando a loja estiver no ar.</p>}
      </div>
    </>
  );
}
