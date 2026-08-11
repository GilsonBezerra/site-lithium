import type { TeamMember } from "@/lib/content";

export default function Team({ team }: { team: TeamMember[] }) {
  return (
    <section className="lith-section lith-section--alt" id="team">
      <div className="lith-container">
        <div className="lith-section__head">
          <span className="lith-eyebrow">Nosso time</span>
          <h2 className="lith-heading">Quem faz acontecer</h2>
          <p className="lith-lede">Conteúdo em desenvolvimento — o time só cresce.</p>
        </div>
        <div className="lith-grid lith-grid--team">
          {team.map((member) => (
            <article className="lith-team-card" key={member.id}>
              <img className="lith-team-card__img" src={member.photo} alt={`Foto de ${member.name}`} />
              <h4>{member.name}</h4>
              <p className="lith-team-card__role">{member.role}</p>
              <ul className="lith-social">
                <li>
                  <a href="#" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
