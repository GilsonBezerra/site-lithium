"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/obras", label: "Obras" },
  { href: "/admin/time", label: "Time" },
  { href: "/admin/sobre", label: "Sobre nós" },
  { href: "/admin/pedidos", label: "Pedidos" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="lith-admin__nav">
      {LINKS.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={active ? "active" : ""}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
