// Tipos usados pelos componentes públicos do site. Os dados vêm do Prisma
// (app/page.tsx) — ver lib/labels.ts para os rótulos legíveis de type/status.

export type Credit = { role: string; name: string };

export type Work = {
  id: string;
  title: string;
  tag: string;
  status: string;
  thumbnail: string;
  fullImage: string;
  description: string;
  credits: Credit[];
  forSale: boolean;
  price: string | null;
  featured: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

export type TimelineEntry = {
  id: string;
  year?: string;
  title: string;
  description?: string;
  isCta?: boolean;
};
