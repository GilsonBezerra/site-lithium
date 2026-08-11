"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/lib/cloudinary-client";

type TeamFormValues = {
  name: string;
  role: string;
  photoUrl: string;
  twitter: string;
  facebook: string;
  linkedin: string;
};

const EMPTY: TeamFormValues = { name: "", role: "", photoUrl: "", twitter: "", facebook: "", linkedin: "" };

export default function TeamForm({ memberId, initial }: { memberId?: string; initial?: Partial<TeamFormValues> }) {
  const router = useRouter();
  const [values, setValues] = useState<TeamFormValues>({ ...EMPTY, ...initial });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof TeamFormValues>(key: K, value: TeamFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!memberId && !file && !values.photoUrl) {
      setError("Selecione uma foto.");
      return;
    }

    setLoading(true);
    try {
      let photoUrl = values.photoUrl;
      if (file) {
        photoUrl = await uploadToCloudinary(file, "lithium/time");
      }

      const res = await fetch(memberId ? `/api/team/${memberId}` : "/api/team", {
        method: memberId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, photoUrl }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Falha ao salvar");
      }

      router.push("/admin/time");
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
        <label>Foto {memberId ? "(deixe em branco para manter a atual)" : ""}</label>
        {values.photoUrl && (
          <img
            src={values.photoUrl}
            alt=""
            style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "50%", marginBottom: 10, border: "1px solid var(--border)" }}
          />
        )}
        <input type="file" accept="image/jpeg,image/png,image/webp" className="lith-input" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </div>
      <div>
        <label htmlFor="name">Nome</label>
        <input id="name" className="lith-input" value={values.name} onChange={(e) => update("name", e.target.value)} required />
      </div>
      <div>
        <label htmlFor="role">Função</label>
        <input id="role" className="lith-input" value={values.role} onChange={(e) => update("role", e.target.value)} required />
      </div>
      <div>
        <label htmlFor="twitter">Twitter (URL, opcional)</label>
        <input id="twitter" className="lith-input" value={values.twitter} onChange={(e) => update("twitter", e.target.value)} />
      </div>
      <div>
        <label htmlFor="facebook">Facebook (URL, opcional)</label>
        <input id="facebook" className="lith-input" value={values.facebook} onChange={(e) => update("facebook", e.target.value)} />
      </div>
      <div>
        <label htmlFor="linkedin">LinkedIn (URL, opcional)</label>
        <input id="linkedin" className="lith-input" value={values.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
      </div>
      {error && <p className="lith-admin-error">{error}</p>}
      <button className="lith-btn lith-btn--primary" type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
