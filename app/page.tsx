import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Team from "@/components/Team";
import Selos from "@/components/Selos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { WORK_TYPE_LABEL, WORK_STATUS_LABEL } from "@/lib/labels";
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
  }));

  const team: TeamMember[] = dbTeam.map((m) => ({ id: m.id, name: m.name, role: m.role, photo: m.photoUrl }));

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
      <Hero />
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
