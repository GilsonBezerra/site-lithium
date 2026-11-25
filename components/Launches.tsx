import Link from "next/link";
import type { Work } from "@/lib/content";
import AmazonLinks from "./AmazonLinks";

export default function Launches({ works }: { works: Work[] }) {
  return (
    <section className="lith-section lith-section--alt" id="lancamentos">
      <div className="lith-container">
        <div className="lith-section__head">
          <span className="lith-eyebrow">Lançamentos</span>
          <h2 className="lith-heading">Para ler agora</h2>
        </div>
        <div className="lith-launches">
          {works.map((work) => (
            <article className="lith-launch" key={work.id}>
              <Link href={`/obras/${work.id}`} className="lith-launch__cover">
                <img src={work.thumbnail} alt={`Capa de ${work.title}`} />
              </Link>
              <div>
                <span className="lith-eyebrow">{work.tag}</span>
                <h3>
                  <Link href={`/obras/${work.id}`}>{work.title}</Link>
                </h3>
                {work.author && <p className="lith-launch__author">{work.author}</p>}
                <p className="lith-launch__text">{work.description}</p>
                <Link href={`/obras/${work.id}`} className="lith-launch__more">
                  Ler a sinopse completa
                </Link>
                <AmazonLinks title={work.title} kindleUrl={work.kindleUrl} printUrl={work.printUrl} />
              </div>
            </article>
          ))}
          {works.length === 0 && <p className="lith-lede">Novidades em breve.</p>}
        </div>
      </div>
    </section>
  );
}
