"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Work } from "@/lib/content";
import { tintClass } from "@/lib/shelf";

// Abertura da home: um destaque por vez, como os banners das editoras,
// mas montado com a capa real em vez de uma arte de banner.
export default function Showcase({ works }: { works: Work[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (works.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % works.length), 7000);
    return () => clearInterval(timer);
  }, [works.length, paused]);

  if (works.length === 0) return null;

  const work = works[index];
  const href = `/obras/${work.id}`;
  const go = (step: number) => setIndex((i) => (i + step + works.length) % works.length);

  return (
    <section
      className="lith-showcase"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="lith-container">
        <div className={`lith-showcase__slide ${tintClass(index)}`} aria-live="polite">
          <div className="lith-showcase__text">
            <p className="lith-showcase__kind">
              {work.tag}
              {work.comingSoon ? ", em breve" : ""}
            </p>
            <h1 className="lith-showcase__title">{work.title}</h1>
            {work.author && <p className="lith-showcase__author">{work.author}</p>}
            {work.description && <p className="lith-showcase__blurb">{work.description}</p>}
            <div className="lith-showcase__actions">
              <Link href={href} className="lith-btn lith-btn--primary">
                {work.comingSoon ? "Conhecer o livro" : work.forSale ? "Ver onde comprar" : "Conhecer a obra"}
              </Link>
              {work.noteIsPrice && <span className="lith-book__note--price">{work.note}</span>}
            </div>
          </div>
          <Link href={href} className="lith-showcase__cover" tabIndex={-1} aria-hidden="true">
            <img src={work.thumbnail} alt="" />
          </Link>
        </div>

        {works.length > 1 && (
          <div className="lith-showcase__controls">
            <div className="lith-showcase__tabs">
              {works.map((w, i) => (
                <button
                  key={w.id}
                  type="button"
                  className="lith-showcase__tab"
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                >
                  {w.title}
                </button>
              ))}
            </div>
            <div className="lith-showcase__arrows">
              <button type="button" className="lith-round-btn" onClick={() => go(-1)} aria-label="Destaque anterior">
                <i className="fas fa-arrow-left" aria-hidden="true"></i>
              </button>
              <button type="button" className="lith-round-btn" onClick={() => go(1)} aria-label="Próximo destaque">
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
