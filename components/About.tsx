import type { TimelineEntry } from "@/lib/content";

export default function About({ timeline }: { timeline: TimelineEntry[] }) {
  return (
    <section className="lith-section" id="about">
      <div className="lith-container">
        <div className="lith-section__head">
          <span className="lith-eyebrow">Sobre nós</span>
          <h2 className="lith-heading">Nossa trajetória</h2>
          <p className="lith-lede">Conteúdo em desenvolvimento — mas a história já começou há um tempo.</p>
        </div>
        <ol className="lith-timeline">
          {timeline.map((entry) =>
            entry.isCta ? (
              <li className="lith-timeline__item lith-timeline__item--cta" key={entry.id}>
                <div className="lith-timeline__panel lith-timeline__panel--cta">
                  <h4>{entry.title}</h4>
                  <a href="#contact" className="lith-btn lith-btn--primary lith-btn--sm">
                    Fale conosco
                  </a>
                </div>
              </li>
            ) : (
              <li className="lith-timeline__item" key={entry.id}>
                <div className="lith-timeline__marker">{entry.year}</div>
                <div className="lith-timeline__panel">
                  <h4>{entry.title}</h4>
                  <p>{entry.description}</p>
                </div>
              </li>
            )
          )}
        </ol>
      </div>
    </section>
  );
}
