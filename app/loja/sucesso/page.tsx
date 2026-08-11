import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SucessoPage() {
  return (
    <>
      <Nav />
      <section className="lith-section" style={{ paddingTop: 160, textAlign: "center" }}>
        <div className="lith-container">
          <span className="lith-eyebrow">Pagamento aprovado</span>
          <h2 className="lith-heading" style={{ marginBottom: 20 }}>Valeu por comprar com a gente!</h2>
          <p className="lith-lede" style={{ margin: "0 auto 32px" }}>
            Você vai receber a confirmação por e-mail. Qualquer dúvida, fale com a gente pelo contato do site.
          </p>
          <Link href="/loja" className="lith-btn lith-btn--primary">
            Voltar pra loja
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
