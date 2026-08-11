import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TimelineForm from "@/components/TimelineForm";

export const dynamic = "force-dynamic";

export default async function EditTimelineEntryPage({ params }: { params: { id: string } }) {
  const entry = await prisma.timelineEntry.findUnique({ where: { id: params.id } });
  if (!entry) notFound();

  return (
    <>
      <div className="lith-admin__header">
        <h1>Editar entrada</h1>
      </div>
      <TimelineForm
        entryId={entry.id}
        initial={{
          year: entry.year || "",
          title: entry.title,
          description: entry.description || "",
          isCta: entry.isCta,
        }}
      />
    </>
  );
}
