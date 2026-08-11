export default function Footer() {
  return (
    <footer className="lith-footer">
      <div className="lith-container lith-footer__inner">
        <span className="lith-footer__copy">
          &copy; {new Date().getFullYear()} Lithium Entertainment — Todos os direitos reservados
        </span>
        <ul className="lith-social">
          <li>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/lithiumcomics/" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/lithiumcomics/?hl=pt-br" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
        <ul className="lith-footer__links">
          <li>
            <a href="#">Política de Privacidade</a>
          </li>
          <li>
            <a href="#">Termos de Uso</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
