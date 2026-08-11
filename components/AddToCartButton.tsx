"use client";

import { useCart } from "@/lib/cart-context";

type Work = { id: string; title: string; coverImage: string; price: string | number };

export default function AddToCartButton({ work }: { work: Work }) {
  const cart = useCart();

  return (
    <button
      className="lith-btn lith-btn--primary"
      onClick={() =>
        cart.addItem({
          workId: work.id,
          title: work.title,
          coverImage: work.coverImage,
          price: Number(work.price),
        })
      }
    >
      Adicionar ao carrinho
    </button>
  );
}
