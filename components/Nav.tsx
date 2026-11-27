"use client";

import { useState } from "react";
import Link from "next/link";
import CartButton from "./CartButton";
import { Lockup } from "./Brand";

const LINKS = [
  { href: "/#lancamentos", label: "Lançamentos" },
  { href: "/#em-breve", label: "Em breve" },
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/loja", label: "Loja" },
  { href: "/#about", label: "Sobre" },
  { href: "/#contact", label: "Contato" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="lith-nav" id="mainNav" aria-label="Principal">
      <div className="lith-container lith-nav__inner">
        <Link className="lith-nav__brand" href="/" onClick={() => setOpen(false)} aria-label="Lithium Entertainment, página inicial">
          <Lockup />
        </Link>
        <div className="lith-nav__actions">
          <CartButton />
          <button
            className="lith-nav__toggle"
            type="button"
            aria-controls="navbarResponsive"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
