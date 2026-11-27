import type { TimelineEntry } from "@/lib/content";

export default function About({ timeline }: { timeline: TimelineEntry[] }) {
  const entries = timeline.filter((e) => !e.isCta);
  const cta = timeline.find((e) => e.isCta);

  return (
    <section className="lith-section" id="about">
      <div className="lith-container lith-about">
        <div className="lith-about__intro">
          <h2 className="lith-heading">Sobre a Lithium</h2>
          <p>
            Somos uma editora independente de quadrinhos, literatura e jogos de tabuleiro. Criamos universos
            próprios e estamos sempre abertos a novas parcerias.
          </p>
        </div>
        <div>
          <ol>
            {entries.map((entry) => (
              <li className="lith-timeline__item" key={entry.id}>
                <span className="lith-timeline__year">{entry.year}</span>
                <div>
                  <h3>{entry.title}</h3>
                  {entry.description && <p>{entry.description}</p>}
                </div>
              </li>
            ))}
          </ol>
          {cta && (
            <div className="lith-timeline__cta">
              <p>{cta.title}</p>
              <a href="#contact" className="lith-link">
                Fale com a gente
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
