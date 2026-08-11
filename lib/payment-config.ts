export const PIX_ENABLED = process.env.NEXT_PUBLIC_PIX_ENABLED === "true";

type SaleableWork = { saleEnabled: boolean; price: unknown; status: string };

// Pronta pra comprar agora (paga na hora, via Pix/cartão).
export function isBuyable(work: SaleableWork): boolean {
  return work.saleEnabled && work.price != null && work.status === "AVAILABLE";
}

// Ainda em produção, mas o cliente pode deixar o e-mail pra ser avisado
// quando ficar disponível (sem cobrar nada agora).
export function isReservable(work: SaleableWork): boolean {
  return work.saleEnabled && work.price != null && work.status === "IN_DEVELOPMENT";
}
