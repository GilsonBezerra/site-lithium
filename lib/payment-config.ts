export const PIX_ENABLED = process.env.NEXT_PUBLIC_PIX_ENABLED === "true";

// Uma obra fica comprável assim que o admin marca "disponível para venda"
// e define um preço — não depende de nenhuma flag global.
export function isBuyable(work: { saleEnabled: boolean; price: unknown }): boolean {
  return work.saleEnabled && work.price != null;
}
