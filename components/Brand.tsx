// Marca da Lithium: o átomo de lítio, sempre. É o mesmo símbolo do selo
// Lithium Book impresso nas capas (O Sexto Mago, O Contador de Horas):
// três órbitas, uma vertical e duas a ±30°, e o núcleo cheio.

export const IMPRINT_COLOR = {
  entertainment: "#5b2bc4",
  book: "#168c89",
  comics: "#c4122f",
  games: "#b7791f",
} as const;

type Imprint = keyof typeof IMPRINT_COLOR;

const IMPRINT_NAME: Record<Imprint, string> = {
  entertainment: "Entertainment",
  book: "Book",
  comics: "Comics",
  games: "Games",
};

export function AtomMark({ color, size = 40 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" focusable="false">
      <g fill="none" stroke={color} strokeWidth="5">
        <ellipse cx="50" cy="50" rx="45" ry="17" transform="rotate(90 50 50)" />
        <ellipse cx="50" cy="50" rx="45" ry="17" transform="rotate(30 50 50)" />
        <ellipse cx="50" cy="50" rx="45" ry="17" transform="rotate(-30 50 50)" />
      </g>
      <circle cx="50" cy="50" r="9" fill={color} />
    </svg>
  );
}

// Assinatura completa: átomo + LITHIUM + nome do selo, como nas capas.
// `inverse` é para fundo escuro (rodapé).
export function Lockup({
  imprint = "entertainment",
  size = "md",
  inverse = false,
}: {
  imprint?: Imprint;
  size?: "md" | "lg";
  inverse?: boolean;
}) {
  const color = IMPRINT_COLOR[imprint];
  return (
    <span className={`lith-lockup lith-lockup--${size}${inverse ? " lith-lockup--inverse" : ""}`}>
      <AtomMark color={inverse && imprint === "entertainment" ? "#a98bf0" : color} size={size === "lg" ? 64 : 40} />
      <span className="lith-lockup__words">
        <span className="lith-lockup__name">Lithium</span>
        <span className="lith-lockup__imprint" style={{ color: inverse && imprint === "entertainment" ? "#a98bf0" : color }}>
          {IMPRINT_NAME[imprint]}
        </span>
      </span>
    </span>
  );
}
