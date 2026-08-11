"use client";

import { useState } from "react";

export default function ReserveButton({ workId, block }: { workId: string; block?: boolean }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workId, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Não foi possível reservar.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Não foi possível reservar.");
    }
  }

  return (
    <>
      <button className={`lith-btn lith-btn--primary${block ? " lith-btn--block" : ""}`} onClick={() => setOpen(true)}>
        Reservar
      </button>

      {open && (
        <div className="lith-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="lith-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <button type="button" className="lith-modal__close" aria-label="Fechar" onClick={() => setOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-body">
                {status === "done" ? (
                  <p>Reserva feita! Você será avisado por e-mail assim que a obra estiver disponível.</p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <p className="lith-modal__tag">Reservar</p>
                    <h2>Avise-me quando estiver pronto</h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: 20 }}>
                      Esta obra ainda está em produção. Deixe seu e-mail e avisamos assim que ela estiver disponível
                      para compra.
                    </p>
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
                    <button className="lith-btn lith-btn--primary lith-btn--block" type="submit" disabled={status === "sending"}>
                      {status === "sending" ? "Enviando..." : "Reservar"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
