import Link from "next/link";
import { Lockup } from "./Brand";

export default function Footer() {
  return (
    <footer className="lith-footer">
      <div className="lith-container">
        <div className="lith-footer__grid">
          <div>
            <Lockup inverse />
            <p className="lith-footer__about">
              Editora independente de quadrinhos, literatura e jogos de tabuleiro. A Casa da Fantasia.
            </p>
          </div>
          <div>
            <h3>Livros e quadrinhos</h3>
            <ul className="lith-footer__links">
              <li><Link href="/#lancamentos">Lançamentos</Link></li>
              <li><Link href="/#em-breve">Em breve</Link></li>
              <li><Link href="/#catalogo">Catálogo</Link></li>
              <li><Link href="/loja">Loja</Link></li>
            </ul>
          </div>
          <div>
            <h3>A editora</h3>
            <ul className="lith-footer__links">
              <li><Link href="/#about">Sobre a Lithium</Link></li>
              <li><Link href="/#selos">Nossos selos</Link></li>
              <li><Link href="/#team">Quem faz</Link></li>
              <li><Link href="/#contact">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3>Redes</h3>
            <ul className="lith-footer__links">
              <li><a href="https://www.instagram.com/lithiumentertainment/">Instagram</a></li>
              <li><a href="https://www.facebook.com/lithiumentertainment/">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="lith-footer__base">
          <span>&copy; {new Date().getFullYear()} Lithium Entertainment. Todos os direitos reservados.</span>
          <Link href="/admin/login">Área da equipe</Link>
        </div>
      </div>
    </footer>
  );
}
