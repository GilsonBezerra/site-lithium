"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type FeaturedWork = { id: string; title: string; tag: string; coverImage: string };

export default function FeaturedCarousel({ items }: { items: FeaturedWork[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  const current = items[index];

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }

  function next() {
    setIndex((i) => (i + 1) % items.length);
  }

  return (
    <div className="lith-carousel">
      <Link href={`/obras/${current.id}`} className="lith-carousel__slide">
        <img src={current.coverImage} alt={current.title} />
        <div className="lith-carousel__caption">
          <span className="lith-carousel__tag">{current.tag}</span>
          <h4>{current.title}</h4>
        </div>
      </Link>

      {items.length > 1 && (
        <>
          <button type="button" className="lith-carousel__arrow lith-carousel__arrow--prev" onClick={prev} aria-label="Destaque anterior">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button type="button" className="lith-carousel__arrow lith-carousel__arrow--next" onClick={next} aria-label="Próximo destaque">
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className="lith-carousel__dots">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`lith-carousel__dot${i === index ? " active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Ir para o destaque ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
