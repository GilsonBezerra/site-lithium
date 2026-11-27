import Link from "next/link";
import type { Work } from "@/lib/content";
import { tintClass } from "@/lib/shelf";

export default function BookCard({ work, index }: { work: Work; index: number }) {
  const href = `/obras/${work.id}`;
  return (
    <article className="lith-book">
      <Link href={href} className={`lith-book__cover ${tintClass(index)}`} tabIndex={-1} aria-hidden="true">
        <img src={work.thumbnail} alt="" loading="lazy" />
      </Link>
      {work.author && <p className="lith-book__author">{work.author}</p>}
      <h3 className="lith-book__title">
        <Link href={href}>{work.title}</Link>
      </h3>
      <p className={`lith-book__note${work.noteIsPrice ? " lith-book__note--price" : ""}`}>{work.note}</p>
    </article>
  );
}
