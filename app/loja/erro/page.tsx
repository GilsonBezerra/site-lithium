import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ErroPage() {
  return (
    <>
      <Nav />
      <section className="lith-section" style={{ paddingTop: 160, textAlign: "center" }}>
        <div className="lith-container">
          <span className="lith-eyebrow">Pagamento não concluído</span>
          <h2 className="lith-heading" style={{ marginBottom: 20 }}>Algo deu errado</h2>
          <p className="lith-lede" style={{ margin: "0 auto 32px" }}>
            Seu pagamento não foi aprovado. Você pode tentar novamente ou usar outro método.
          </p>
          <Link href="/loja" className="lith-btn lith-btn--primary">
            Tentar novamente
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
