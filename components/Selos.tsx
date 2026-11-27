import { Lockup } from "./Brand";

const IMPRINTS = [
  {
    imprint: "comics" as const,
    name: "Lithium Comics",
    text: "Quadrinhos autorais. Não temos super-heróis, mas temos detetives, equipes policiais e muita aventura.",
  },
  {
    imprint: "book" as const,
    name: "Lithium Book",
    text: "Literatura fantástica, suspense, infantojuvenil, romance policial e livros técnicos.",
  },
  {
    imprint: "games" as const,
    name: "Lithium Games",
    text: "Jogos de tabuleiro: resgatamos jogos antigos e criamos títulos próprios.",
  },
];

export default function Selos() {
  return (
    <section className="lith-section lith-section--mist" id="selos">
      <div className="lith-container">
        <div className="lith-section__head">
          <h2 className="lith-heading">Nossos selos</h2>
          <p>Cada linha da Lithium Entertainment tem a sua marca.</p>
        </div>
        <div className="lith-imprints">
          {IMPRINTS.map((imprint) => (
            <article className="lith-imprint" key={imprint.name}>
              <h3 aria-label={imprint.name}>
                <Lockup imprint={imprint.imprint} size="lg" />
              </h3>
              <p>{imprint.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
