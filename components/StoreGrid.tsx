"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

type Work = { id: string; title: string; coverImage: string; price: string | number; tag: string; buyable: boolean };

export default function StoreGrid({ works }: { works: Work[] }) {
  const cart = useCart();

  if (works.length === 0) {
    return <p className="lith-lede" style={{ textAlign: "center" }}>Nenhuma obra à venda no momento — volte em breve.</p>;
  }

  return (
    <div className="lith-grid lith-grid--3">
      {works.map((work) => (
        <article className="lith-card" key={work.id} style={{ padding: 0, overflow: "hidden" }}>
          <Link href={`/obras/${work.id}`}>
            <img
              src={work.coverImage}
              alt={work.title}
              style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover" }}
            />
          </Link>
          <div style={{ padding: 24 }}>
            <p className="lith-eyebrow" style={{ marginBottom: 6 }}>{work.tag}</p>
            <Link href={`/obras/${work.id}`}>
              <h3 className="lith-card__title" style={{ marginBottom: 10 }}>{work.title}</h3>
            </Link>
            <p style={{ color: "var(--text)", fontWeight: 700, marginBottom: 16 }}>
              R$ {Number(work.price).toFixed(2).replace(".", ",")}
            </p>
            <button
              className="lith-btn lith-btn--primary lith-btn--block"
              disabled={!work.buyable}
              onClick={() =>
                cart.addItem({
                  workId: work.id,
                  title: work.title,
                  coverImage: work.coverImage,
                  price: Number(work.price),
                })
              }
            >
              {work.buyable ? "Adicionar ao carrinho" : "Em breve"}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
