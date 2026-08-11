"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import CheckoutSheet from "./CheckoutSheet";

export default function CartDrawer() {
  const cart = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  if (!cart.isOpen) return null;

  function handleClose() {
    cart.close();
    setCheckingOut(false);
  }

  return (
    <div className="lith-drawer-backdrop" onClick={handleClose}>
      <aside className="lith-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="lith-drawer__header">
          <h3>{checkingOut ? "Finalizar compra" : "Seu carrinho"}</h3>
          <button type="button" className="lith-modal__close" aria-label="Fechar" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="lith-drawer__body">
          {checkingOut ? (
            <CheckoutSheet
              items={cart.items}
              total={cart.total}
              onSuccess={() => {
                cart.clear();
              }}
            />
          ) : cart.items.length === 0 ? (
            <p className="lith-lede">Seu carrinho está vazio.</p>
          ) : (
            <ul className="lith-cart-list">
              {cart.items.map((item) => (
                <li className="lith-cart-list__item" key={item.workId}>
                  <img src={item.coverImage} alt={item.title} />
                  <div className="lith-cart-list__body">
                    <p className="lith-cart-list__title">{item.title}</p>
                    <p className="lith-cart-list__price">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                    <div className="lith-cart-list__qty">
                      <button type="button" onClick={() => cart.setQuantity(item.workId, item.quantity - 1)} aria-label="Diminuir quantidade">
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => cart.setQuantity(item.workId, item.quantity + 1)} aria-label="Aumentar quantidade">
                        +
                      </button>
                    </div>
                  </div>
                  <button type="button" className="lith-cart-list__remove" onClick={() => cart.removeItem(item.workId)} aria-label="Remover item">
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!checkingOut && cart.items.length > 0 && (
          <div className="lith-drawer__footer">
            <div className="lith-drawer__total">
              <span>Total</span>
              <span>R$ {cart.total.toFixed(2).replace(".", ",")}</span>
            </div>
            <button className="lith-btn lith-btn--primary lith-btn--block" onClick={() => setCheckingOut(true)}>
              Finalizar compra
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
