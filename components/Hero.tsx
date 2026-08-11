import FeaturedCarousel from "./FeaturedCarousel";

type FeaturedWork = { id: string; title: string; tag: string; coverImage: string };

export default function Hero({ featured }: { featured: FeaturedWork[] }) {
  return (
    <header className="lith-hero" id="hero">
      <div className="lith-hero__glow"></div>
      <div className="lith-hero__halftone"></div>
      <div className="lith-container lith-hero__inner">
        <div className="lith-hero__content">
          <span className="lith-badge">Em construção — novidades toda semana</span>
          <h1 className="lith-hero__title">
            A CASA DA<span className="lith-hero__title-accent"> FANTASIA</span>
          </h1>
          <p className="lith-hero__subtitle">
            Somos uma produtora independente de quadrinhos, literatura e jogos de tabuleiro. Criamos universos
            próprios e estamos sempre em busca de novas colaborações.
          </p>
          <div className="lith-hero__actions">
            <a href="#portfolio" className="lith-btn lith-btn--primary">
              Ver portfólio
            </a>
            <a href="#contact" className="lith-btn lith-btn--ghost">
              Fale conosco
            </a>
          </div>
        </div>
        {featured.length > 0 && (
          <div className="lith-hero__carousel">
            <FeaturedCarousel items={featured} />
          </div>
        )}
      </div>
      <a href="#services" className="lith-hero__scroll" aria-label="Rolar para baixo">
        <i className="fas fa-chevron-down"></i>
      </a>
    </header>
  );
}
