import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const works = await prisma.work.findMany({ select: { id: true, updatedAt: true } });
  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/loja` },
    ...works.map((w) => ({ url: `${SITE_URL}/obras/${w.id}`, lastModified: w.updatedAt })),
  ];
}
