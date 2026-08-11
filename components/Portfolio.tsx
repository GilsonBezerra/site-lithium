"use client";

import { useState } from "react";
import type { Work } from "@/lib/content";
import Lightbox from "./Lightbox";

export default function Portfolio({ works }: { works: Work[] }) {
  const [selected, setSelected] = useState<Work | null>(null);

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
            <button
              type="button"
              className="lith-portfolio-item"
              key={work.id}
              onClick={() => setSelected(work)}
            >
              <img className="lith-portfolio-item__img" src={work.thumbnail} alt={`Capa de ${work.title}`} />
              <div className="lith-portfolio-item__overlay">
                <i className="fas fa-plus"></i>
              </div>
              <div className="lith-portfolio-item__caption">
                <h4>{work.title}</h4>
                <p>{work.status}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && <Lightbox work={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
