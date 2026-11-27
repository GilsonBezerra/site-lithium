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
  comingSoon: boolean;
  author: string | null;
  kindleUrl: string | null;
  printUrl: string | null;
  // Tipo cru (COMIC/BOOK/GAME), usado no filtro do catálogo
  type: string;
  // Linha curta sob o título: preço, "Na Amazon" ou o status
  note: string;
  noteIsPrice: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
  links: { label: string; icon: string; url: string }[];
};

export type TimelineEntry = {
  id: string;
  year?: string;
  title: string;
  description?: string;
  isCta?: boolean;
};
