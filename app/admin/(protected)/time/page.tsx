import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function TimePage() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <div className="lith-admin__header">
        <h1>Time</h1>
        <Link href="/admin/time/novo" className="lith-btn lith-btn--primary lith-btn--sm">
          + Novo membro
        </Link>
      </div>
      <div className="lith-admin-list">
        {team.map((member) => (
          <div className="lith-admin-row" key={member.id}>
            <img className="lith-admin-row__thumb" src={member.photoUrl} alt={member.name} style={{ borderRadius: "50%" }} />
            <div className="lith-admin-row__body">
              <p className="lith-admin-row__title">{member.name}</p>
              <p className="lith-admin-row__meta">{member.role}</p>
            </div>
            <div className="lith-admin-row__actions">
              <Link href={`/admin/time/${member.id}`}>Editar</Link>
              <DeleteButton endpoint={`/api/team/${member.id}`} confirmText="Remover este membro do time?" />
            </div>
          </div>
        ))}
        {team.length === 0 && <p className="lith-admin-empty">Nenhum membro cadastrado ainda.</p>}
      </div>
    </>
  );
}
