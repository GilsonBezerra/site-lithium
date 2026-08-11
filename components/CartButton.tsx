"use client";

import { useCart } from "@/lib/cart-context";

export default function CartButton() {
  const { count, open } = useCart();

  return (
    <button type="button" className="lith-cart-button" onClick={open} aria-label="Abrir carrinho">
      <i className="fas fa-shopping-bag"></i>
      {count > 0 && <span className="lith-cart-button__badge">{count}</span>}
    </button>
  );
}
