import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AmazonLinks from "@/components/AmazonLinks";
import AddToCartButton from "@/components/AddToCartButton";
import ReserveButton from "@/components/ReserveButton";
import { prisma } from "@/lib/prisma";
import { WORK_TYPE_LABEL, WORK_STATUS_LABEL } from "@/lib/labels";
import { isBuyable, isReservable } from "@/lib/payment-config";
import { formatPrice, signature } from "@/lib/shelf";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const work = await prisma.work.findUnique({ where: { id: params.id } });
  if (!work) return {};
  const title = `${work.title} — Lithium Entertainment`;
  const description = work.description?.replace(/\s+/g, " ").slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [work.coverImage],
      url: `/obras/${work.id}`,
      siteName: "Lithium Entertainment",
      locale: "pt_BR",
    },
  };
}

export default async function ObraPage({ params }: { params: { id: string } }) {
  const work = await prisma.work.findUnique({
    where: { id: params.id },
    include: { credits: { orderBy: { order: "asc" } } },
  });

  if (!work) notFound();

  const forSale = work.saleEnabled && work.price != null;
  const buyable = isBuyable(work);
  const reservable = isReservable(work);
  const onAmazon = work.status === "AVAILABLE" && Boolean(work.kindleUrl || work.printUrl);
  const author = signature(work.credits);
  const kind = WORK_TYPE_LABEL[work.type] ?? work.type;

  return (
    <>
      <Nav />
      <main className="lith-page">
        <div className="lith-container">
          <p className="lith-crumbs">
            <Link href="/">Início</Link> / <Link href="/#catalogo">Catálogo</Link> / {work.title}
          </p>
          <div className="lith-obra">
            <div className="lith-obra__media tint-1">
              <img src={work.coverImage} alt={`Capa de ${work.title}`} />
            </div>
            <div>
              <p className="lith-obra__kind">{kind}</p>
              <h1 className="lith-obra__title">{work.title}</h1>
              {author && <p className="lith-obra__author">{author}</p>}

              <div className="lith-obra__buy">
                {buyable && (
                  <>
                    <span className="lith-obra__price">{formatPrice(work.price)}</span>
                    <AddToCartButton
                      work={{ id: work.id, title: work.title, coverImage: work.coverImage, price: String(work.price) }}
                    />
                  </>
                )}
                {onAmazon && <AmazonLinks title={work.title} kindleUrl={work.kindleUrl} printUrl={work.printUrl} />}
                {!buyable && !onAmazon && (
                  <>
                    <p className="lith-obra__status">
                      {WORK_STATUS_LABEL[work.status] ?? work.status}
                      {forSale && `, ${formatPrice(work.price)}`}
                    </p>
                    {reservable && <ReserveButton workId={work.id} label="Avise-me quando sair" />}
                  </>
                )}
              </div>

              {work.description && <p className="lith-obra__text">{work.description}</p>}

              {work.credits.length > 0 && (
                <dl className="lith-obra__credits">
                  {work.credits.map((credit) => (
                    <div key={credit.id} style={{ display: "contents" }}>
                      <dt>{credit.role}</dt>
                      <dd>{credit.name}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
