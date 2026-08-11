import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";
import { WORK_TYPE_LABEL, WORK_STATUS_LABEL } from "@/lib/labels";

export const dynamic = "force-dynamic";

export default async function ObrasPage() {
  const works = await prisma.work.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }] });

  return (
    <>
      <div className="lith-admin__header">
        <h1>Obras</h1>
        <Link href="/admin/obras/novo" className="lith-btn lith-btn--primary lith-btn--sm">
          + Nova obra
        </Link>
      </div>
      <div className="lith-admin-list">
        {works.map((work) => (
          <div className="lith-admin-row" key={work.id}>
            <img className="lith-admin-row__thumb" src={work.coverImage} alt={work.title} />
            <div className="lith-admin-row__body">
              <p className="lith-admin-row__title">{work.title}</p>
              <p className="lith-admin-row__meta">
                {WORK_TYPE_LABEL[work.type]} · {WORK_STATUS_LABEL[work.status]}
                {work.saleEnabled ? " · à venda" : ""}
                {work.featured ? " · destaque" : ""}
              </p>
            </div>
            <div className="lith-admin-row__actions">
              <Link href={`/admin/obras/${work.id}`}>Editar</Link>
              <DeleteButton endpoint={`/api/works/${work.id}`} confirmText="Excluir esta obra? Essa ação não pode ser desfeita." />
            </div>
          </div>
        ))}
        {works.length === 0 && <p className="lith-admin-empty">Nenhuma obra cadastrada ainda.</p>}
      </div>
    </>
  );
}
