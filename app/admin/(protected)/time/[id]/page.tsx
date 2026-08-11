import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeamForm from "@/components/TeamForm";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const member = await prisma.teamMember.findUnique({ where: { id: params.id } });
  if (!member) notFound();

  return (
    <>
      <div className="lith-admin__header">
        <h1>Editar membro</h1>
      </div>
      <TeamForm
        memberId={member.id}
        initial={{
          name: member.name,
          role: member.role,
          photoUrl: member.photoUrl,
          twitter: member.twitter || "",
          facebook: member.facebook || "",
          linkedin: member.linkedin || "",
        }}
      />
    </>
  );
}
