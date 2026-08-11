"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", { email, password, redirect: false });

    setLoading(false);
    if (res?.error) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="lith-admin__login">
      <div className="lith-admin__login-card">
        <div className="lith-admin__login-brand">
          <span className="lith-nav__brand-mark">Li</span>
          <span className="lith-nav__brand-text">
            Lithium<em>Entertainment</em>
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="lith-form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="lith-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="lith-form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              className="lith-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="lith-admin-error" style={{ marginBottom: 16 }}>{error}</p>}
          <button className="lith-btn lith-btn--primary lith-btn--block" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
