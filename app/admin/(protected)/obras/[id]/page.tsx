import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WorkForm from "@/components/WorkForm";

export const dynamic = "force-dynamic";

export default async function EditWorkPage({ params }: { params: { id: string } }) {
  const work = await prisma.work.findUnique({
    where: { id: params.id },
    include: {
      credits: { orderBy: { order: "asc" } },
      reservations: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!work) notFound();

  return (
    <>
      <div className="lith-admin__header">
        <h1>Editar obra</h1>
      </div>
      <WorkForm
        workId={work.id}
        initial={{
          title: work.title,
          type: work.type,
          status: work.status,
          description: work.description || "",
          coverImage: work.coverImage,
          price: work.price ? String(work.price) : "",
          saleEnabled: work.saleEnabled,
          featured: work.featured,
          credits: work.credits.length ? work.credits.map((c) => ({ role: c.role, name: c.name })) : [{ role: "Roteiro", name: "" }],
        }}
      />

      {work.reservations.length > 0 && (
        <div style={{ marginTop: 40, maxWidth: 560 }}>
          <h2 style={{ color: "#fff", fontSize: "1.1rem", textTransform: "uppercase", marginBottom: 16 }}>
            Lista de espera ({work.reservations.length})
          </h2>
          <div className="lith-admin-list">
            {work.reservations.map((r) => (
              <div className="lith-admin-row" key={r.id}>
                <div className="lith-admin-row__body">
                  <p className="lith-admin-row__title">{r.email}</p>
                  <p className="lith-admin-row__meta">{new Date(r.createdAt).toLocaleString("pt-BR")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
