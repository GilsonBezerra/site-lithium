"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Work } from "@/lib/content";

export default function Lightbox({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lith-modal-backdrop" onClick={onClose}>
      <div className="lith-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <button type="button" className="lith-modal__close" aria-label="Fechar" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          <div className="modal-body">
            <p className="lith-modal__tag">{work.tag}</p>
            <h2>{work.title}</h2>
            <img className="lith-modal__img" src={work.fullImage} alt={`Arte de ${work.title}`} />
            <p>{work.description}</p>
            <ul className="lith-modal__credits">
              {work.credits.map((credit) => (
                <li key={credit.role}>
                  {credit.role}: {credit.name}
                </li>
              ))}
            </ul>
            {work.forSale && (
              <div className="lith-modal__buy">
                <span>R$ {Number(work.price).toFixed(2).replace(".", ",")}</span>
                <Link href="/loja" className="lith-btn lith-btn--primary lith-btn--sm">
                  Comprar na loja
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
