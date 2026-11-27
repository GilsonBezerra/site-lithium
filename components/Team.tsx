import type { TeamMember } from "@/lib/content";

export default function Team({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;

  return (
    <section className="lith-section lith-section--mist" id="team">
      <div className="lith-container">
        <div className="lith-section__head">
          <h2 className="lith-heading">Quem faz</h2>
        </div>
        <div className="lith-team">
          {team.map((member) => (
            <article className="lith-person" key={member.id}>
              <img src={member.photo} alt="" />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                {member.links.length > 0 && (
                  <ul className="lith-social">
                    {member.links.map((l) => (
                      <li key={l.icon}>
                        <a href={l.url} aria-label={`${l.label} de ${member.name}`} target="_blank" rel="noopener noreferrer">
                          <i className={`fab ${l.icon}`} aria-hidden="true"></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
