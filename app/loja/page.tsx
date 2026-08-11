import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StoreGrid from "@/components/StoreGrid";
import { prisma } from "@/lib/prisma";
import { WORK_TYPE_LABEL } from "@/lib/labels";
import { isBuyable } from "@/lib/payment-config";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Loja — Lithium Entertainment",
};

export default async function LojaPage() {
  const works = await prisma.work.findMany({
    where: { saleEnabled: true, price: { not: null } },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return (
    <>
      <Nav />
      <section className="lith-section" style={{ paddingTop: 160 }}>
        <div className="lith-container">
          <div className="lith-section__head">
            <span className="lith-eyebrow">Loja</span>
            <h2 className="lith-heading">Leve um pedaço do nosso universo</h2>
            <p className="lith-lede">Quadrinhos, livros e jogos direto de quem produz — pagamento via Pix ou cartão.</p>
          </div>
          <StoreGrid
            works={works.map((w) => ({
              id: w.id,
              title: w.title,
              coverImage: w.coverImage,
              price: String(w.price),
              tag: WORK_TYPE_LABEL[w.type] ?? w.type,
              buyable: isBuyable(w),
            }))}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
