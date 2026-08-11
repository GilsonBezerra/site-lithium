import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PendentePage() {
  return (
    <>
      <Nav />
      <section className="lith-section" style={{ paddingTop: 160, textAlign: "center" }}>
        <div className="lith-container">
          <span className="lith-eyebrow">Pagamento em análise</span>
          <h2 className="lith-heading" style={{ marginBottom: 20 }}>Estamos confirmando seu pagamento</h2>
          <p className="lith-lede" style={{ margin: "0 auto 32px" }}>
            Isso pode levar alguns minutos. Você vai receber a confirmação por e-mail assim que for aprovado.
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
