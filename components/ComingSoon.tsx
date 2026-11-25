import Link from "next/link";
import type { Work } from "@/lib/content";
import ReserveButton from "./ReserveButton";

export default function ComingSoon({ works }: { works: Work[] }) {
  if (works.length === 0) return null;

  return (
    <section className="lith-section lith-soon" id="em-breve">
      <div className="lith-container">
        {works.map((work) => (
          <article className="lith-soon__item" key={work.id}>
            <Link href={`/obras/${work.id}`} className="lith-soon__cover">
              <img src={work.thumbnail} alt={`Capa de ${work.title}`} />
            </Link>
            <div>
              <span className="lith-soon__tag">Em breve</span>
              <h2 className="lith-heading">{work.title}</h2>
              {work.author && <p className="lith-launch__author">{work.author}</p>}
              <p className="lith-soon__text">{work.description}</p>
              <ReserveButton workId={work.id} label="Avise-me" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
