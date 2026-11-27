import "../css/main.css";
import "../css/admin.css";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";

import { SITE_URL } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Lithium Entertainment — A Casa da Fantasia",
    description: "Estúdio brasileiro de quadrinhos, literatura e jogos de tabuleiro.",
    images: ["/img/og-lancamentos.jpg"],
    url: "/",
    siteName: "Lithium Entertainment",
    locale: "pt_BR",
  },
  twitter: { card: "summary_large_image" },
  title: "Lithium Entertainment — A Casa da Fantasia",
  description:
    "Lithium Entertainment — estúdio brasileiro de quadrinhos, literatura e jogos de tabuleiro. A Casa da Fantasia.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%235b2bc4' stroke-width='6'%3E%3Cellipse cx='50' cy='50' rx='45' ry='17' transform='rotate(90 50 50)'/%3E%3Cellipse cx='50' cy='50' rx='45' ry='17' transform='rotate(30 50 50)'/%3E%3Cellipse cx='50' cy='50' rx='45' ry='17' transform='rotate(-30 50 50)'/%3E%3C/g%3E%3Ccircle cx='50' cy='50' r='10' fill='%235b2bc4'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
        <link href="/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
      </head>
      <body id="page-top">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
