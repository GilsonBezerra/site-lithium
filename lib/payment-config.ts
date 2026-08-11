export const PAYMENT_ENABLED = process.env.NEXT_PUBLIC_PAYMENT_ENABLED === "true";
export const PIX_ENABLED = PAYMENT_ENABLED && process.env.NEXT_PUBLIC_PIX_ENABLED === "true";
