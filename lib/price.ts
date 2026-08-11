// Converte texto de preço digitado pelo usuário (aceita "39,90" ou "39.90",
// com ou sem separador de milhar) num number válido, ou null se inválido/vazio.
export function parsePrice(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const normalized = trimmed.includes(",") ? trimmed.replace(/\./g, "").replace(",", ".") : trimmed;

  const value = Number(normalized);
  return Number.isFinite(value) && value >= 0 ? value : NaN;
}
