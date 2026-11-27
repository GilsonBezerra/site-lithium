import Link from "next/link";
import type { Work } from "@/lib/content";
import BookCard from "./BookCard";

export default function Launches({ works }: { works: Work[] }) {
  if (works.length === 0) return null;

  return (
    <section className="lith-section" id="lancamentos">
      <div className="lith-container">
        <div className="lith-section__head">
          <h2 className="lith-heading">Lançamentos</h2>
          <Link href="/loja" className="lith-btn lith-btn--ghost lith-btn--sm">
            Ver a loja
          </Link>
        </div>
        <div className="lith-shelf">
          {works.map((work, i) => (
            <BookCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
