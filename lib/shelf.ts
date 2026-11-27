import { WORK_STATUS_LABEL } from "./labels";
import { isBuyable } from "./payment-config";

type ShelfWork = {
  status: string;
  saleEnabled: boolean;
  price: unknown;
  kindleUrl: string | null;
  printUrl: string | null;
};

export function formatPrice(price: unknown): string {
  return `R$ ${Number(price).toFixed(2).replace(".", ",")}`;
}

// A linha curta que aparece sob o título nas prateleiras, como nas
// editoras: o preço quando dá pra comprar aqui, "Na Amazon" quando a
// venda é lá, e o status nos demais casos.
export function shelfNote(work: ShelfWork): { note: string; noteIsPrice: boolean } {
  if (isBuyable(work)) return { note: formatPrice(work.price), noteIsPrice: true };
  if (work.status === "AVAILABLE" && (work.kindleUrl || work.printUrl)) {
    return { note: "Na Amazon", noteIsPrice: false };
  }
  return { note: WORK_STATUS_LABEL[work.status] ?? work.status, noteIsPrice: false };
}

// Quem assina a obra: autor nos livros, roteiro nos quadrinhos.
export function signature(credits: { role: string; name: string }[]): string | null {
  const byRole = (role: string) => credits.find((c) => c.role.toLowerCase() === role)?.name;
  return byRole("autor") ?? byRole("roteiro") ?? credits[0]?.name ?? null;
}

// Tom do painel atrás da capa. Fixo por posição para a página não mudar
// de cor a cada visita.
export function tintClass(index: number): string {
  return `tint-${(index % 4) + 1}`;
}
