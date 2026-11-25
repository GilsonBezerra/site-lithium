import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Launches from "@/components/Launches";
import ComingSoon from "@/components/ComingSoon";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Team from "@/components/Team";
import Selos from "@/components/Selos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { WORK_TYPE_LABEL, WORK_STATUS_LABEL } from "@/lib/labels";
import { isBuyable } from "@/lib/payment-config";
import type { Work, TeamMember, TimelineEntry } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [dbWorks, dbTeam, dbTimeline] = await Promise.all([
    prisma.work.findMany({
      include: { credits: { orderBy: { order: "asc" } } },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    }),
    prisma.teamMember.findMany({ orderBy: { order: "asc" } }),
    prisma.timelineEntry.findMany({ orderBy: { order: "asc" } }),
  ]);

  const works: Work[] = dbWorks.map((w) => ({
    id: w.id,
    title: w.title,
    tag: WORK_TYPE_LABEL[w.type] ?? w.type,
    status: WORK_STATUS_LABEL[w.status] ?? w.status,
    thumbnail: w.coverImage,
    fullImage: w.coverImage,
    description: w.description ?? "",
    credits: w.credits.map((c) => ({ role: c.role, name: c.name })),
    forSale: isBuyable(w) || (w.status === "AVAILABLE" && Boolean(w.kindleUrl || w.printUrl)),
    comingSoon: w.status === "COMING_SOON",
    author: w.credits.find((c) => c.role === "Autor")?.name ?? null,
    kindleUrl: w.kindleUrl,
    printUrl: w.printUrl,
    price: w.price != null ? String(w.price) : null,
    featured: w.featured,
  }));

  const featuredWorks = works.filter((w) => w.featured);

  const team: TeamMember[] = dbTeam.map((m) => ({ id: m.id, name: m.name, role: m.role, photo: m.photoUrl, links: [
      { label: "Twitter", icon: "fa-twitter", url: m.twitter },
      { label: "Facebook", icon: "fa-facebook-f", url: m.facebook },
      { label: "LinkedIn", icon: "fa-linkedin-in", url: m.linkedin },
    ].flatMap((l) => (l.url?.startsWith("http") ? [{ ...l, url: l.url }] : [])) }));

  const timeline: TimelineEntry[] = dbTimeline.map((t) => ({
    id: t.id,
    year: t.year ?? undefined,
    title: t.title,
    description: t.description ?? undefined,
    isCta: t.isCta,
  }));

  return (
    <>
      <Nav />
      <Hero
        featured={featuredWorks.map((w) => ({ id: w.id, title: w.title, tag: w.tag, coverImage: w.thumbnail }))}
      />
      <Launches works={featuredWorks.filter((w) => w.forSale && (w.kindleUrl || w.printUrl))} />
      <ComingSoon works={featuredWorks.filter((w) => w.comingSoon)} />
      <Services />
      <Portfolio works={works} />
      <About timeline={timeline} />
      <Team team={team} />
      <Selos />
      <Contact />
      <Footer />
    </>
  );
}
