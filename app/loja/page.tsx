import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StoreGrid from "@/components/StoreGrid";
import { prisma } from "@/lib/prisma";
import { WORK_TYPE_LABEL, WORK_STATUS_LABEL } from "@/lib/labels";
import { isBuyable, isReservable } from "@/lib/payment-config";
import { signature } from "@/lib/shelf";

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
    include: { credits: { orderBy: { order: "asc" } } },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return (
    <>
      <Nav />
      <main className="lith-page">
        <div className="lith-container">
          <div className="lith-section__head">
            <h1 className="lith-heading">Loja</h1>
            <p>Quadrinhos direto de quem produz, com pagamento por Pix ou cartão. Os livros são vendidos na Amazon.</p>
          </div>
          <StoreGrid
            works={works.map((w) => ({
              id: w.id,
              title: w.title,
              author: signature(w.credits),
              coverImage: w.coverImage,
              price: w.saleEnabled && w.price != null ? String(w.price) : null,
              kindleUrl: w.status === "AVAILABLE" ? w.kindleUrl : null,
              printUrl: w.status === "AVAILABLE" ? w.printUrl : null,
              tag: WORK_TYPE_LABEL[w.type] ?? w.type,
              status: WORK_STATUS_LABEL[w.status] ?? w.status,
              buyable: isBuyable(w),
              reservable: isReservable(w),
            }))}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
