import Link from "next/link";
import type { Work } from "@/lib/content";

export default function Portfolio({ works }: { works: Work[] }) {
  return (
    <section className="lith-section lith-section--alt" id="portfolio">
      <div className="lith-container">
        <div className="lith-section__head">
          <span className="lith-eyebrow">Portfólio</span>
          <h2 className="lith-heading">Nossos universos</h2>
          <p className="lith-lede">Um recorte do que já criamos e do que ainda está sendo desenhado.</p>
        </div>
        <div className="lith-grid lith-grid--3">
          {works.map((work) => (
            <Link href={`/obras/${work.id}`} className="lith-portfolio-item" key={work.id}>
              <img className="lith-portfolio-item__img" src={work.thumbnail} alt={`Capa de ${work.title}`} />
              <div className="lith-portfolio-item__overlay">
                <i className="fas fa-plus"></i>
              </div>
              {work.forSale && <span className="lith-portfolio-item__badge">À venda</span>}
              <div className="lith-portfolio-item__caption">
                <h4>{work.title}</h4>
                <p>{work.status}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
