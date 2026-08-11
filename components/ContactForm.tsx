"use client";

import { FormEvent, useState } from "react";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function validate(): boolean {
    const nextErrors: Errors = {};
    if (!values.name.trim()) nextErrors.name = "Este campo é obrigatório.";
    if (!values.email.trim()) nextErrors.email = "Este campo é obrigatório.";
    else if (!EMAIL_RE.test(values.email)) nextErrors.email = "Informe um e-mail válido.";
    if (!values.phone.trim()) nextErrors.phone = "Este campo é obrigatório.";
    if (!values.message.trim()) nextErrors.message = "Este campo é obrigatório.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFeedback("");
    if (!validate()) {
      setStatus("error");
      setFeedback("Corrija os campos destacados antes de enviar.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("sent");
        setFeedback("Mensagem enviada! Em breve entraremos em contato.");
        setValues({ name: "", email: "", phone: "", message: "", website: "" });
      } else {
        setStatus("error");
        setFeedback(data.error || "Não foi possível enviar sua mensagem.");
      }
    } catch {
      setStatus("error");
      setFeedback("Erro de conexão. Tente novamente em instantes.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="lith-form-group">
        <input
          className={`lith-input${errors.name ? " lith-input--invalid" : ""}`}
          type="text"
          placeholder="Seu nome *"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onFocus={() => setFeedback("")}
        />
        <p className="lith-form-error">{errors.name}</p>
      </div>
      <div className="lith-form-row">
        <div className="lith-form-group">
          <input
            className={`lith-input${errors.email ? " lith-input--invalid" : ""}`}
            type="email"
            placeholder="Seu e-mail *"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <p className="lith-form-error">{errors.email}</p>
        </div>
        <div className="lith-form-group">
          <input
            className={`lith-input${errors.phone ? " lith-input--invalid" : ""}`}
            type="tel"
            placeholder="Seu telefone *"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
          <p className="lith-form-error">{errors.phone}</p>
        </div>
      </div>
      <div className="lith-form-group">
        <textarea
          className={`lith-input${errors.message ? " lith-input--invalid" : ""}`}
          rows={5}
          placeholder="Sua mensagem *"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
        />
        <p className="lith-form-error">{errors.message}</p>
      </div>
      {/* honeypot anti-spam, mantido oculto para humanos */}
      <div className="lith-form-honeypot" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>
      <div className={`lith-form-feedback${status === "error" || status === "sent" ? ` lith-form-feedback--${status === "sent" ? "success" : "error"}` : ""}`} role="status" aria-live="polite">
        {feedback}
      </div>
      <button className="lith-btn lith-btn--primary lith-btn--block" type="submit" disabled={status === "sending"}>
        <span className="lith-btn__label">{status === "sending" ? "Enviando..." : "Enviar mensagem"}</span>
      </button>
    </form>
  );
}
