import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="lith-section lith-section--alt" id="contact">
      <div className="lith-container">
        <div className="lith-contact">
          <div className="lith-contact__info">
            <span className="lith-eyebrow">Fale conosco</span>
            <h2 className="lith-heading">Vamos criar juntos?</h2>
            <p className="lith-lede">
              Tem uma ideia, proposta de colaboração ou quer saber mais sobre nossos projetos? Preencha o
              formulário ou fale direto com a gente.
            </p>
            <ul className="lith-contact__list">
              <li>
                <i className="fas fa-envelope"></i> contato@lithiumentertainment.com.br
              </li>
              <li>
                <i className="fab fa-instagram"></i> @lithiumentertainment
              </li>
              <li>
                <i className="fab fa-facebook-f"></i> /lithiumentertainment
              </li>
            </ul>
          </div>
          <div className="lith-contact__form-wrap">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
