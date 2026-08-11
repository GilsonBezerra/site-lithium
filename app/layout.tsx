import "../css/main.css";

export const metadata = {
  title: "Lithium Entertainment — A Casa da Fantasia",
  description:
    "Lithium Entertainment — estúdio brasileiro de quadrinhos, literatura e jogos de tabuleiro. A Casa da Fantasia.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%230a0a0f'/%3E%3Ccircle cx='32' cy='32' r='9' fill='%238b5cf6'/%3E%3Cg stroke='%23f43f5e' stroke-width='3' fill='none'%3E%3Cellipse cx='32' cy='32' rx='26' ry='11'/%3E%3Cellipse cx='32' cy='32' rx='26' ry='11' transform='rotate(60 32 32)'/%3E%3Cellipse cx='32' cy='32' rx='26' ry='11' transform='rotate(120 32 32)'/%3E%3C/g%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link href="/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
      </head>
      <body id="page-top">{children}</body>
    </html>
  );
}
