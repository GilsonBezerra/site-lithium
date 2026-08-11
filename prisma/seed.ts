import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmins() {
  const admins = [
    { name: "Gihl Bizzy", email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD },
    { name: "André Moura", email: process.env.ADMIN2_EMAIL, password: process.env.ADMIN2_PASSWORD },
  ];

  for (const admin of admins) {
    if (!admin.email || !admin.password) {
      console.warn(`Pulando admin "${admin.name}": e-mail/senha não definidos no .env.`);
      continue;
    }
    const passwordHash = await bcrypt.hash(admin.password, 10);
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: { passwordHash, name: admin.name },
      create: { email: admin.email, passwordHash, name: admin.name },
    });
    console.log(`Admin criado/atualizado: ${admin.email}`);
  }
}

async function seedWorks() {
  const count = await prisma.work.count();
  if (count > 0) return;

  await prisma.work.create({
    data: {
      title: "Diesel",
      type: "COMIC",
      status: "AVAILABLE",
      coverImage: "/legacy/portfolio/02-thumbnail.jpg",
      description:
        "Quando Diesel é demitido do posto onde trabalhou por longos anos, a gerente do posto, e também sobrinha do dono, o convence a bolar um plano para roubarem a grana que seria coletada pela empresa de segurança. Tudo começa a desandar quando Diesel, apelido que Jaime ganhou por só trabalhar na bomba de diesel do posto, decide ir até a favela arrumar uma arma com um antigo amigo de escola.",
      credits: { create: [{ role: "Roteiro", name: "Gihl Bizzy", order: 0 }, { role: "Arte", name: "Gihl Bizzy", order: 1 }] },
    },
  });

  await prisma.work.create({
    data: {
      title: "A Estação das Almas",
      type: "COMIC",
      status: "IN_DEVELOPMENT",
      coverImage: "/legacy/portfolio/01-thumbnail.jpg",
      description:
        "Três amigos acordam em lugares diferentes de uma cidade misteriosa e cheia de gente agindo estranho. Todos os medos que tinham se manifestam ali e tudo fica muito mais estranho quando o sinal da estação toca anunciando a chegada do trem. Todos correm e se abrigam fugindo dos apanhadores — estranhos seres que caçam pessoas e as levam para a estação onde embarcam para um destino desconhecido.",
      credits: {
        create: [
          { role: "Roteiro", name: "Gihl Bizzy", order: 0 },
          { role: "Desenhos", name: "Victor Vladimir", order: 1 },
          { role: "Arte final", name: "Israel Oliveira", order: 2 },
          { role: "Cores", name: "Gled Rodrigues", order: 3 },
        ],
      },
    },
  });

  await prisma.work.create({
    data: {
      title: "A Guerra de Dois",
      type: "COMIC",
      status: "IN_DEVELOPMENT",
      coverImage: "/legacy/portfolio/01-thumbnail.jpg",
      description:
        "Dois soldados brasileiros são escolhidos para saltarem com o grupo de paraquedistas do exército americano durante a Segunda Guerra Mundial. Durante o salto, algo sai errado e eles pousam longe do alvo. Sem saber onde estão, se unem para tentar achar a base americana enquanto contam um para o outro como eram suas vidas antes de chegarem até ali.",
      credits: { create: [{ role: "Roteiro", name: "Gihl Bizzy", order: 0 }, { role: "Desenhos", name: "Gihl Bizzy", order: 1 }] },
    },
  });

  console.log("Obras iniciais criadas.");
}

async function seedTeam() {
  const count = await prisma.teamMember.count();
  if (count > 0) return;

  await prisma.teamMember.createMany({
    data: [
      { name: "Gihl Bizzy", role: "Roteirista / Desenhista", photoUrl: "/legacy/team/2.jpg", order: 0 },
      { name: "André Moura", role: "Roteirista", photoUrl: "/legacy/team/3.jpeg", order: 1 },
    ],
  });

  console.log("Time inicial criado.");
}

async function seedTimeline() {
  const count = await prisma.timelineEntry.count();
  if (count > 0) return;

  await prisma.timelineEntry.createMany({
    data: [
      {
        year: "2011",
        title: "Quando nascemos",
        description:
          'A Lithium nasceu em 2011 como estúdio para produzir a HQ "A Estação das Almas", que participaria do concurso de quadrinhos da editora Barba Negra.',
        order: 0,
      },
      {
        year: "2014",
        title: "Criação de um universo",
        description:
          "Em 2014 criamos nosso universo — não de super-heróis, mas de seres humanos transformados em seres biônicos por uma corporação gananciosa. O projeto envolveu cerca de 12 pessoas entre roteiristas, desenhistas e editores. Está engavetado, mas quem sabe?",
        order: 1,
      },
      {
        year: "2018",
        title: "Pausa forçada",
        description: "Nunca foi fácil fazer quadrinhos, e por isso tivemos que parar para nos reinventarmos e olhar para outros projetos.",
        order: 2,
      },
      {
        year: "2019",
        title: "De volta e com tudo",
        description:
          "Voltamos! Neste ano, eu, Gihl Bizzy, fui um dos 9 selecionados para a iniciativa Narrativas Periféricas, da Editora Mino em parceria com a Chiaroscuro Estúdio e a PerifaCon. Infelizmente, por conta do trabalho, precisei sair do projeto.",
        order: 3,
      },
      { title: "Seja parte da nossa trajetória!", isCta: true, order: 4 },
    ],
  });

  console.log("Linha do tempo inicial criada.");
}

async function main() {
  await seedAdmins();
  await seedWorks();
  await seedTeam();
  await seedTimeline();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
