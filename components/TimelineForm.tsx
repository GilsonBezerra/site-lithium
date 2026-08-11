"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TimelineFormValues = {
  year: string;
  title: string;
  description: string;
  isCta: boolean;
};

const EMPTY: TimelineFormValues = { year: "", title: "", description: "", isCta: false };

export default function TimelineForm({ entryId, initial }: { entryId?: string; initial?: Partial<TimelineFormValues> }) {
  const router = useRouter();
  const [values, setValues] = useState<TimelineFormValues>({ ...EMPTY, ...initial });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof TimelineFormValues>(key: K, value: TimelineFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(entryId ? `/api/timeline/${entryId}` : "/api/timeline", {
        method: entryId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Falha ao salvar");
      }
      router.push("/admin/sobre");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="lith-admin-form">
      <label className="lith-admin-form__checkbox">
        <input type="checkbox" checked={values.isCta} onChange={(e) => update("isCta", e.target.checked)} />
        Esta é a entrada final de chamada (sem ano/descrição, só um convite pra contato)
      </label>
      {!values.isCta && (
        <div>
          <label htmlFor="year">Ano</label>
          <input id="year" className="lith-input" value={values.year} onChange={(e) => update("year", e.target.value)} placeholder="2011" />
        </div>
      )}
      <div>
        <label htmlFor="title">Título</label>
        <input id="title" className="lith-input" value={values.title} onChange={(e) => update("title", e.target.value)} required />
      </div>
      {!values.isCta && (
        <div>
          <label htmlFor="description">Descrição</label>
          <textarea id="description" className="lith-input" rows={4} value={values.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      )}
      {error && <p className="lith-admin-error">{error}</p>}
      <button className="lith-btn lith-btn--primary" type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
