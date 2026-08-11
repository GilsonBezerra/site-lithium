"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartButton from "./CartButton";

const LINKS = [
  { href: "/#page-top", label: "Início" },
  { href: "/#services", label: "O que fazemos" },
  { href: "/#portfolio", label: "Portfólio" },
  { href: "/#about", label: "Sobre nós" },
  { href: "/#team", label: "Nosso time" },
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
        <Link className="lith-nav__brand" href="/#page-top" onClick={() => setOpen(false)}>
          <span className="lith-nav__brand-mark">Li</span>
          <span className="lith-nav__brand-text">
            Lithium<em>Entertainment</em>
          </span>
        </Link>
        <div className="lith-nav__actions">
          <Link href="/admin/login" className="lith-cart-button" aria-label="Entrar no painel admin">
            <i className="fas fa-lock"></i>
          </Link>
          <CartButton />
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
        </div>
        <div className={`lith-nav__menu${open ? " lith-nav__menu--open" : ""}`} id="navbarResponsive">
          <ul className="lith-nav__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="lith-nav__cta" href="/#contact" onClick={() => setOpen(false)}>
                Fale conosco
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
