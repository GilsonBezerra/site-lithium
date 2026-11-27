import Link from "next/link";
import type { Work } from "@/lib/content";
import ReserveButton from "./ReserveButton";

export default function ComingSoon({ works }: { works: Work[] }) {
  if (works.length === 0) return null;

  return (
    <section className="lith-section lith-section--mist" id="em-breve">
      <div className="lith-container">
        {works.map((work) => (
          <article className="lith-soon" key={work.id}>
            <Link href={`/obras/${work.id}`} className="lith-soon__cover tint-1" tabIndex={-1} aria-hidden="true">
              <img src={work.thumbnail} alt="" />
            </Link>
            <div>
              <p className="lith-soon__when">Em breve</p>
              <h2 className="lith-heading">
                <Link href={`/obras/${work.id}`}>{work.title}</Link>
              </h2>
              {work.author && <p className="lith-soon__author">{work.author}</p>}
              {work.description && <p className="lith-soon__text">{work.description}</p>}
              <ReserveButton workId={work.id} label="Avise-me quando sair" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
