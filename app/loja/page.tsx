import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StoreGrid from "@/components/StoreGrid";
import { prisma } from "@/lib/prisma";
import { WORK_TYPE_LABEL } from "@/lib/labels";
import { isBuyable, isReservable } from "@/lib/payment-config";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Loja — Lithium Entertainment",
};

export default async function LojaPage() {
  const works = await prisma.work.findMany({
    where: {
      OR: [
        { saleEnabled: true, price: { not: null } },
        { status: "AVAILABLE", OR: [{ kindleUrl: { not: null } }, { printUrl: { not: null } }] },
      ],
    },
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
            <p className="lith-lede">Quadrinhos direto de quem produz, com pagamento via Pix ou cartão. Os livros são vendidos na Amazon.</p>
          </div>
          <StoreGrid
            works={works.map((w) => ({
              id: w.id,
              title: w.title,
              coverImage: w.coverImage,
              price: w.saleEnabled && w.price != null ? String(w.price) : null,
              kindleUrl: w.status === "AVAILABLE" ? w.kindleUrl : null,
              printUrl: w.status === "AVAILABLE" ? w.printUrl : null,
              tag: WORK_TYPE_LABEL[w.type] ?? w.type,
              buyable: isBuyable(w),
              reservable: isReservable(w),
            }))}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
