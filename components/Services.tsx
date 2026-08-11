const SERVICES = [
  {
    icon: "fa-comment",
    color: "violet",
    title: "Quadrinhos",
    text: "Produzimos nossos quadrinhos e criamos nosso próprio universo! Não temos super-heróis, mas temos detetives, equipes policiais e muita aventura.",
  },
  {
    icon: "fa-book",
    color: "rose",
    title: "Literatura",
    text: "Também produzimos literatura fantástica, suspense, infanto-juvenil e romance policial, sempre com a nossa cara.",
  },
  {
    icon: "fa-map",
    color: "amber",
    title: "Jogos de tabuleiro",
    text: "Somos apaixonados por jogos de tabuleiro: resgatamos jogos antigos e produzimos novos títulos autorais.",
  },
];

export default function Services() {
  return (
    <section className="lith-section" id="services">
      <div className="lith-container">
        <div className="lith-section__head">
          <span className="lith-eyebrow">O que fazemos</span>
          <h2 className="lith-heading">Histórias em múltiplos formatos</h2>
          <p className="lith-lede">
            Produzimos nossas próprias histórias e estamos sempre em busca de colaboração — do roteiro ao
            tabuleiro.
          </p>
        </div>
        <div className="lith-grid lith-grid--3">
          {SERVICES.map((service) => (
            <article className="lith-card" key={service.title}>
              <div className={`lith-card__icon lith-card__icon--${service.color}`}>
                <i className={`fa ${service.icon}`}></i>
              </div>
              <h3 className="lith-card__title">{service.title}</h3>
              <p className="lith-card__text">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
