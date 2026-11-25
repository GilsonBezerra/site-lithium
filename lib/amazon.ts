// Aceita só links https da Amazon. Vazio vira null; qualquer outra coisa é inválida.
const HOST_RE = /^((www\.)?amazon\.(com\.br|com)|amzn\.to|a\.co)$/;

export type AmazonUrl = { ok: true; url: string | null } | { ok: false };

export function parseAmazonUrl(raw: unknown): AmazonUrl {
  if (raw == null) return { ok: true, url: null };
  if (typeof raw !== "string") return { ok: false };
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, url: null };
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return { ok: false };
    return HOST_RE.test(url.hostname) ? { ok: true, url: url.toString() } : { ok: false };
  } catch {
    return { ok: false };
  }
}
