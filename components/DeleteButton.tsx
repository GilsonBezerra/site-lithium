"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ endpoint, confirmText }: { endpoint: string; confirmText: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(confirmText)) return;
    const res = await fetch(endpoint, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Não foi possível excluir. Tente novamente.");
    }
  }

  return <button onClick={handleDelete}>Excluir</button>;
}
