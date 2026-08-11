"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/lib/cloudinary-client";

type Credit = { role: string; name: string };

type WorkFormValues = {
  title: string;
  type: "COMIC" | "BOOK" | "GAME";
  status: "IN_DEVELOPMENT" | "AVAILABLE";
  description: string;
  coverImage: string;
  price: string;
  saleEnabled: boolean;
  featured: boolean;
  credits: Credit[];
};

const EMPTY: WorkFormValues = {
  title: "",
  type: "COMIC",
  status: "IN_DEVELOPMENT",
  description: "",
  coverImage: "",
  price: "",
  saleEnabled: false,
  featured: false,
  credits: [{ role: "Roteiro", name: "" }],
};

export default function WorkForm({ workId, initial }: { workId?: string; initial?: Partial<WorkFormValues> }) {
  const router = useRouter();
  const [values, setValues] = useState<WorkFormValues>({ ...EMPTY, ...initial });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof WorkFormValues>(key: K, value: WorkFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function updateCredit(index: number, field: keyof Credit, value: string) {
    setValues((v) => ({
      ...v,
      credits: v.credits.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  }

  function addCredit() {
    setValues((v) => ({ ...v, credits: [...v.credits, { role: "", name: "" }] }));
  }

  function removeCredit(index: number) {
    setValues((v) => ({ ...v, credits: v.credits.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!workId && !file && !values.coverImage) {
      setError("Selecione uma imagem de capa.");
      return;
    }
    if (!values.title.trim()) {
      setError("Informe o título.");
      return;
    }

    setLoading(true);
    try {
      let coverImage = values.coverImage;
      if (file) {
        coverImage = await uploadToCloudinary(file, "lithium/obras");
      }

      const payload = { ...values, coverImage };
      const res = await fetch(workId ? `/api/works/${workId}` : "/api/works", {
        method: workId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Falha ao salvar");
      }

      router.push("/admin/obras");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="lith-admin-form">
      <div>
        <label>Capa {workId ? "(deixe em branco para manter a atual)" : ""}</label>
        {values.coverImage && (
          <img
            src={values.coverImage}
            alt=""
            style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 8, marginBottom: 10, border: "1px solid var(--border)" }}
          />
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="lith-input"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <div>
        <label htmlFor="title">Título</label>
        <input id="title" className="lith-input" value={values.title} onChange={(e) => update("title", e.target.value)} required />
      </div>

      <div>
        <label htmlFor="type">Tipo</label>
        <select id="type" className="lith-input" value={values.type} onChange={(e) => update("type", e.target.value as WorkFormValues["type"])}>
          <option value="COMIC">Quadrinho</option>
          <option value="BOOK">Livro</option>
          <option value="GAME">Jogo</option>
        </select>
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select id="status" className="lith-input" value={values.status} onChange={(e) => update("status", e.target.value as WorkFormValues["status"])}>
          <option value="IN_DEVELOPMENT">Em desenvolvimento</option>
          <option value="AVAILABLE">Disponível</option>
        </select>
      </div>

      <div>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          className="lith-input"
          rows={4}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div>
        <label>Créditos</label>
        {values.credits.map((credit, i) => (
          <div className="lith-admin-credit-row" key={i}>
            <input
              className="lith-input"
              placeholder="Papel (ex: Roteiro)"
              value={credit.role}
              onChange={(e) => updateCredit(i, "role", e.target.value)}
            />
            <input
              className="lith-input"
              placeholder="Nome"
              value={credit.name}
              onChange={(e) => updateCredit(i, "name", e.target.value)}
            />
            <button type="button" onClick={() => removeCredit(i)} aria-label="Remover crédito">
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
        <button type="button" className="lith-btn lith-btn--ghost lith-btn--sm" onClick={addCredit}>
          + Adicionar crédito
        </button>
      </div>

      <label className="lith-admin-form__checkbox">
        <input type="checkbox" checked={values.featured} onChange={(e) => update("featured", e.target.checked)} />
        Destacar na home
      </label>

      <label className="lith-admin-form__checkbox">
        <input type="checkbox" checked={values.saleEnabled} onChange={(e) => update("saleEnabled", e.target.checked)} />
        Disponível para venda na loja
      </label>

      {values.saleEnabled && (
        <div>
          <label htmlFor="price">Preço (R$)</label>
          <input
            id="price"
            className="lith-input"
            placeholder="49.90"
            value={values.price}
            onChange={(e) => update("price", e.target.value)}
          />
        </div>
      )}

      {error && <p className="lith-admin-error">{error}</p>}

      <button className="lith-btn lith-btn--primary" type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
