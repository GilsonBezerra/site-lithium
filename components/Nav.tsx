"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#page-top", label: "Início" },
  { href: "#services", label: "O que fazemos" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#about", label: "Sobre nós" },
  { href: "#team", label: "Nosso time" },
  { href: "/loja", label: "Loja" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`lith-nav${scrolled ? " lith-nav--scrolled" : ""}`} id="mainNav">
      <div className="lith-container lith-nav__inner">
        <a className="lith-nav__brand" href="#page-top" onClick={() => setOpen(false)}>
          <span className="lith-nav__brand-mark">Li</span>
          <span className="lith-nav__brand-text">
            Lithium<em>Entertainment</em>
          </span>
        </a>
        <button
          className={`lith-nav__toggle${open ? " lith-nav__toggle--open" : ""}`}
          type="button"
          aria-controls="navbarResponsive"
          aria-expanded={open}
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`lith-nav__menu${open ? " lith-nav__menu--open" : ""}`} id="navbarResponsive">
          <ul className="lith-nav__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a className="lith-nav__cta" href="#contact" onClick={() => setOpen(false)}>
                Fale conosco
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
