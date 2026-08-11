"use client";

import { useEffect, useState } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import type { IPaymentFormData } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import type { CartItem } from "@/lib/cart-context";

let mpInitialized = false;

export default function CheckoutSheet({
  items,
  total,
  onSuccess,
}: {
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "brick" | "pix" | "done">("email");
  const [preferenceId, setPreferenceId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [pix, setPix] = useState<{ qrCode?: string; qrCodeBase64?: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
    if (publicKey && !mpInitialized) {
      initMercadoPago(publicKey, { locale: "pt-BR" });
      mpInitialized = true;
    }
  }, []);

  async function startCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/store/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ workId: i.workId, quantity: i.quantity })),
          payerEmail: email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Não foi possível iniciar o pagamento.");
      setPreferenceId(data.preferenceId);
      setOrderId(data.orderId);
      setStep("brick");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o pagamento.");
    } finally {
      setLoading(false);
    }
  }

  async function handleBrickSubmit({ formData }: IPaymentFormData) {
    const res = await fetch("/api/store/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, orderId, payerEmail: email }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Pagamento recusado.");
      return;
    }

    if (data.pixQrCode) {
      setPix({ qrCode: data.pixQrCode, qrCodeBase64: data.pixQrCodeBase64 });
      setStep("pix");
    } else {
      setStep("done");
    }
    onSuccess();
  }

  return (
    <div className="lith-checkout">
      <p style={{ marginBottom: 20, color: "var(--text-muted)" }}>
        {items.length} {items.length === 1 ? "item" : "itens"} · Total: R$ {total.toFixed(2).replace(".", ",")}
      </p>

      {step === "email" && (
        <form onSubmit={startCheckout}>
          <div className="lith-form-group">
            <input
              className="lith-input"
              type="email"
              placeholder="Seu e-mail *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="lith-admin-error" style={{ marginBottom: 16 }}>{error}</p>}
          <button className="lith-btn lith-btn--primary lith-btn--block" type="submit" disabled={loading}>
            {loading ? "Preparando..." : "Continuar"}
          </button>
        </form>
      )}

      {step === "brick" && preferenceId && (
        <>
          {error && <p className="lith-admin-error" style={{ marginBottom: 16 }}>{error}</p>}
          <Payment
            initialization={{ amount: total, preferenceId }}
            onSubmit={handleBrickSubmit}
            onError={() => setError("Erro ao processar o pagamento.")}
            customization={{
              paymentMethods: {
                creditCard: "all",
                bankTransfer: "all",
                maxInstallments: 3,
              },
            }}
          />
        </>
      )}

      {step === "pix" && pix && (
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: 16 }}>Escaneie o QR Code ou copie o código Pix abaixo:</p>
          {pix.qrCodeBase64 && (
            <img
              src={`data:image/png;base64,${pix.qrCodeBase64}`}
              alt="QR Code Pix"
              style={{ width: 220, height: 220, margin: "0 auto 16px", borderRadius: 8 }}
            />
          )}
          <textarea
            className="lith-input"
            readOnly
            rows={3}
            value={pix.qrCode}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>
      )}

      {step === "done" && <p>Pagamento em processamento. Você receberá a confirmação por e-mail.</p>}
    </div>
  );
}
