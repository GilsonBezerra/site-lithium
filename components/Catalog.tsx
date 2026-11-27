"use client";

import { useState } from "react";
import type { Work } from "@/lib/content";
import { WORK_TYPE_LABEL } from "@/lib/labels";
import BookCard from "./BookCard";

// Catálogo completo, com filtro por tipo de obra. Os filtros só aparecem
// para os tipos que existem no catálogo.
export default function Catalog({ works }: { works: Work[] }) {
  const [type, setType] = useState<string | null>(null);
  const types = Object.keys(WORK_TYPE_LABEL).filter((t) => works.some((w) => w.type === t));
  const shown = type ? works.filter((w) => w.type === type) : works;

  return (
    <section className="lith-section" id="catalogo">
      <div className="lith-container">
        <div className="lith-section__head">
          <h2 className="lith-heading">Catálogo</h2>
          {types.length > 1 && (
            <div className="lith-filters" role="group" aria-label="Filtrar o catálogo">
              <button type="button" className="lith-filter" aria-pressed={type === null} onClick={() => setType(null)}>
                Tudo
              </button>
              {types.map((t) => (
                <button key={t} type="button" className="lith-filter" aria-pressed={type === t} onClick={() => setType(t)}>
                  {WORK_TYPE_LABEL[t]}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="lith-shelf">
          {shown.map((work, i) => (
            <BookCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
