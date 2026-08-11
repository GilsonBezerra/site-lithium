import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/lib/prisma";
import { WORK_TYPE_LABEL, WORK_STATUS_LABEL } from "@/lib/labels";
import { isBuyable } from "@/lib/payment-config";

export const dynamic = "force-dynamic";

export default async function ObraPage({ params }: { params: { id: string } }) {
  const work = await prisma.work.findUnique({
    where: { id: params.id },
    include: { credits: { orderBy: { order: "asc" } } },
  });

  if (!work) notFound();

  const forSale = work.saleEnabled && work.price != null;
  const buyable = isBuyable(work);

  return (
    <>
      <Nav />
      <section className="lith-section" style={{ paddingTop: 160 }}>
        <div className="lith-container">
          <div className="lith-obra">
            <div className="lith-obra__media">
              <img src={work.coverImage} alt={work.title} />
            </div>
            <div className="lith-obra__body">
              <p className="lith-eyebrow">{WORK_TYPE_LABEL[work.type] ?? work.type}</p>
              <h1 className="lith-heading">{work.title}</h1>
              <p className="lith-lede" style={{ margin: "12px 0 0" }}>
                {WORK_STATUS_LABEL[work.status] ?? work.status}
              </p>
              {work.description && <p style={{ marginTop: 20, color: "var(--text-muted)" }}>{work.description}</p>}

              {work.credits.length > 0 && (
                <ul className="lith-modal__credits" style={{ marginTop: 24 }}>
                  {work.credits.map((credit) => (
                    <li key={credit.id}>
                      {credit.role}: {credit.name}
                    </li>
                  ))}
                </ul>
              )}

              {forSale && (
                <div className="lith-obra__buy">
                  <span>R$ {Number(work.price).toFixed(2).replace(".", ",")}</span>
                  <AddToCartButton
                    work={{ id: work.id, title: work.title, coverImage: work.coverImage, price: String(work.price) }}
                    buyable={buyable}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
