import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function SobrePage() {
  const timeline = await prisma.timelineEntry.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <div className="lith-admin__header">
        <h1>Sobre nós</h1>
        <Link href="/admin/sobre/novo" className="lith-btn lith-btn--primary lith-btn--sm">
          + Nova entrada
        </Link>
      </div>
      <div className="lith-admin-list">
        {timeline.map((entry) => (
          <div className="lith-admin-row" key={entry.id}>
            <div className="lith-admin-row__body">
              <p className="lith-admin-row__title">
                {entry.year ? `${entry.year} — ` : ""}
                {entry.title}
              </p>
              {entry.isCta && <p className="lith-admin-row__meta">Entrada de chamada (CTA)</p>}
            </div>
            <div className="lith-admin-row__actions">
              <Link href={`/admin/sobre/${entry.id}`}>Editar</Link>
              <DeleteButton endpoint={`/api/timeline/${entry.id}`} confirmText="Excluir esta entrada da linha do tempo?" />
            </div>
          </div>
        ))}
        {timeline.length === 0 && <p className="lith-admin-empty">Nenhuma entrada cadastrada ainda.</p>}
      </div>
    </>
  );
}
