import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WorkForm from "@/components/WorkForm";

export const dynamic = "force-dynamic";

export default async function EditWorkPage({ params }: { params: { id: string } }) {
  const work = await prisma.work.findUnique({
    where: { id: params.id },
    include: { credits: { orderBy: { order: "asc" } } },
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
    </>
  );
}
