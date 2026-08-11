"use client";

import { useState } from "react";
import CheckoutSheet from "./CheckoutSheet";

type Work = { id: string; title: string; coverImage: string; price: string | number; tag: string };

export default function StoreGrid({ works, paymentEnabled }: { works: Work[]; paymentEnabled: boolean }) {
  const [selected, setSelected] = useState<Work | null>(null);

  if (works.length === 0) {
    return <p className="lith-lede" style={{ textAlign: "center" }}>Nenhuma obra à venda no momento — volte em breve.</p>;
  }

  return (
    <>
      <div className="lith-grid lith-grid--3">
        {works.map((work) => (
          <article className="lith-card" key={work.id} style={{ padding: 0, overflow: "hidden" }}>
            <img
              src={work.coverImage}
              alt={work.title}
              style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover" }}
            />
            <div style={{ padding: 24 }}>
              <p className="lith-eyebrow" style={{ marginBottom: 6 }}>{work.tag}</p>
              <h3 className="lith-card__title" style={{ marginBottom: 10 }}>{work.title}</h3>
              <p style={{ color: "var(--text)", fontWeight: 700, marginBottom: 16 }}>
                R$ {Number(work.price).toFixed(2).replace(".", ",")}
              </p>
              <button
                className="lith-btn lith-btn--primary lith-btn--block"
                disabled={!paymentEnabled}
                onClick={() => setSelected(work)}
              >
                {paymentEnabled ? "Comprar" : "Em breve"}
              </button>
            </div>
          </article>
        ))}
      </div>
      {selected && <CheckoutSheet work={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
