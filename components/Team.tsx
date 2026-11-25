import type { TeamMember } from "@/lib/content";

export default function Team({ team }: { team: TeamMember[] }) {
  return (
    <section className="lith-section lith-section--alt" id="team">
      <div className="lith-container">
        <div className="lith-section__head">
          <span className="lith-eyebrow">Nosso time</span>
          <h2 className="lith-heading">Quem faz acontecer</h2>
        </div>
        <div className="lith-grid lith-grid--team">
          {team.map((member) => (
            <article className="lith-team-card" key={member.id}>
              <img className="lith-team-card__img" src={member.photo} alt={`Foto de ${member.name}`} />
              <h4>{member.name}</h4>
              <p className="lith-team-card__role">{member.role}</p>
              {member.links.length > 0 && (
                <ul className="lith-social">
                  {member.links.map((l) => (
                    <li key={l.icon}>
                      <a href={l.url} aria-label={`${l.label} de ${member.name}`} target="_blank" rel="noopener noreferrer">
                        <i className={`fab ${l.icon}`}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
