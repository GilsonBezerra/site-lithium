"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, tintClass } from "@/lib/shelf";
import AmazonLinks from "./AmazonLinks";
import ReserveButton from "./ReserveButton";

type Work = {
  id: string;
  title: string;
  author: string | null;
  coverImage: string;
  price: string | number | null;
  kindleUrl: string | null;
  printUrl: string | null;
  tag: string;
  status: string;
  buyable: boolean;
  reservable: boolean;
};

export default function StoreGrid({ works }: { works: Work[] }) {
  const cart = useCart();

  if (works.length === 0) {
    return <p className="lith-empty">Nenhuma obra à venda no momento. Veja o que vem por aí no catálogo.</p>;
  }

  return (
    <div className="lith-shelf">
      {works.map((work, i) => (
        <article className="lith-book" key={work.id}>
          <Link href={`/obras/${work.id}`} className={`lith-book__cover ${tintClass(i)}`} tabIndex={-1} aria-hidden="true">
            <img src={work.coverImage} alt="" loading="lazy" />
          </Link>
          {work.author && <p className="lith-book__author">{work.author}</p>}
          <h2 className="lith-book__title">
            <Link href={`/obras/${work.id}`}>{work.title}</Link>
          </h2>
          {work.price != null &&
            (work.buyable ? (
              <p className="lith-book__note lith-book__note--price">{formatPrice(work.price)}</p>
            ) : (
              <p className="lith-book__note">
                {work.status}, {formatPrice(work.price)}
              </p>
            ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            {work.buyable ? (
              <button
                className="lith-btn lith-btn--primary lith-btn--block"
                onClick={() =>
                  cart.addItem({
                    workId: work.id,
                    title: work.title,
                    coverImage: work.coverImage,
                    price: Number(work.price),
                  })
                }
              >
                Adicionar ao carrinho
              </button>
            ) : work.reservable ? (
              <ReserveButton workId={work.id} block label="Avise-me quando sair" />
            ) : null}
            <AmazonLinks title={work.title} kindleUrl={work.kindleUrl} printUrl={work.printUrl} block />
          </div>
        </article>
      ))}
    </div>
  );
}
