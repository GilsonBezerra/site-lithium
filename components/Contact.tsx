import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="lith-section" id="contact">
      <div className="lith-container lith-contact">
        <div>
          <h2 className="lith-heading">Fale com a Lithium</h2>
          <p className="lith-lede" style={{ marginTop: 20 }}>
            Propostas de originais, parcerias, imprensa ou dúvidas sobre um pedido. Respondemos por e-mail.
          </p>
          <ul className="lith-contact__list">
            <li>
              <i className="fas fa-envelope" aria-hidden="true"></i> contato@lithiumentertainment.com.br
            </li>
            <li>
              <i className="fab fa-instagram" aria-hidden="true"></i> @lithiumentertainment
            </li>
            <li>
              <i className="fab fa-facebook-f" aria-hidden="true"></i> /lithiumentertainment
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
