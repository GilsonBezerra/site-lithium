# Lithium Entertainment

Site institucional + loja + área administrativa da Lithium Entertainment, em Next.js (App Router).

## Stack

- **Next.js 14** (App Router) + React
- **Prisma** + **Postgres** (Neon) — obras, time, linha do tempo, admins, pedidos
- **NextAuth** (Credentials) — login da área `/admin`
- **Cloudinary** — upload de imagens direto do navegador (preset unsigned)
- **Nodemailer** — formulário de contato
- **Mercado Pago** (`mercadopago` + `@mercadopago/sdk-react`) — loja com Pix e cartão via Payment Brick

## Setup local

1. `npm install`
2. Copie `.env.example` para `.env` e preencha as variáveis (veja os comentários de cada bloco no próprio arquivo)
3. `npx prisma db push` — cria as tabelas no banco configurado em `DATABASE_URL`
4. `npm run seed` — cria os administradores (`ADMIN_EMAIL`/`ADMIN_PASSWORD`, `ADMIN2_EMAIL`/`ADMIN2_PASSWORD`) e o conteúdo inicial (obras, time, linha do tempo), se o banco ainda estiver vazio
5. `npm run dev` — roda em `http://localhost:3000`

## Estrutura

- `app/` — páginas públicas (`/`, `/loja`), área admin (`app/admin`) e rotas de API (`app/api`)
- `components/` — componentes React do site público e do admin
- `lib/` — Prisma client, NextAuth config, Nodemailer, Cloudinary client, config de pagamento
- `prisma/schema.prisma` — modelo de dados (`Work`, `WorkCredit`, `Order`, `TeamMember`, `TimelineEntry`, `Admin`)
- `css/main.css` — folha de estilo global (importada em `app/layout.tsx`)
- `public/` — assets estáticos (selos SVG, imagens legadas do portfólio/time)

## Área admin (`/admin`)

Login único por conta (2 contas seedadas: Gihl Bizzy e André Moura). Depois de logar:

- **Obras** — CRUD do catálogo (quadrinhos/livros/jogos), com upload de capa, créditos, e flag de venda/preço
- **Time** — CRUD dos membros exibidos na home
- **Sobre nós** — CRUD da linha do tempo
- **Pedidos** — lista só-leitura dos pedidos feitos na loja (populada pelo webhook do Mercado Pago)

## Loja / Mercado Pago

A loja fica atrás da flag `NEXT_PUBLIC_PAYMENT_ENABLED`. Com `false`, os botões de compra aparecem desabilitados ("Em breve"). Para habilitar:

1. Preencha `MP_ACCESS_TOKEN` e `NEXT_PUBLIC_MP_PUBLIC_KEY` com as credenciais da conta Mercado Pago da Lithium (comece pelas de **teste**, no painel do MP em Suas integrações → Credenciais)
2. Configure um webhook no painel do Mercado Pago apontando para `<seu domínio>/api/webhooks/mercadopago` e copie a **chave secreta** gerada para `MP_WEBHOOK_SECRET` — sem isso o webhook rejeita todas as notificações (assinatura inválida)
3. Marque `NEXT_PUBLIC_PAYMENT_ENABLED=true`
4. Teste uma compra fake com os [cartões de teste do Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/additional-content/your-integrations/test/cards) antes de trocar para credenciais de produção

## Deploy

Vercel detecta o projeto Next.js automaticamente (zero-config). Cadastre todas as variáveis do `.env` no painel do projeto (Settings → Environment Variables) antes do primeiro deploy — o `.env` local nunca é enviado ao Git.
