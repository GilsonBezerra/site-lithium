// Cadastra os lançamentos sem mexer nas obras existentes. Pode rodar mais de uma vez.
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const LANCAMENTOS: Prisma.WorkCreateInput[] = [
  {
    title: "O Contador de Horas e o Mundo do Jardim",
    type: "BOOK",
    status: "AVAILABLE",
    featured: true,
    order: -30,
    coverImage: "/img/obras/contador-de-horas.jpg",
    kindleUrl: "https://www.amazon.com.br/dp/B0HSQ9L3KZ",
    printUrl: "https://www.amazon.com/dp/B0HSQR6WLC",
    description: `Erlon só queria passar o Natal com a namorada. No sítio do avô, ele conta as horas para voltar. Então, no sótão, um relógio parado solta um canto de cuco. O sol no mostrador está apagado. E, por trás da madeira, alguém bate do outro lado.

Ao atravessarem o relógio, Erlon, Lara e Heitor descobrem um mundo escondido entre raízes, onde besouros carregam bolachas e a água está prestes a dividir dois povos. Para voltar à ceia, os três precisam descobrir por que a passagem se abriu e por que o Jardim ainda fala do avô deles.`,
    credits: { create: [{ role: "Autor", name: "Gilson F. Bezerra" }] },
  },
  {
    title: "Guia Prático de Backend com Java e Spring",
    type: "BOOK",
    status: "AVAILABLE",
    featured: true,
    order: -20,
    coverImage: "/img/obras/guia-backend.jpg",
    kindleUrl: "https://www.amazon.com.br/dp/B0HHWMTPR6",
    printUrl: "https://www.amazon.com.br/dp/B0HHYFPLPJ",
    description: `Do Gateway ao Deploy: um manual sequencial para construir um backend sem reinventar a arquitetura a cada novo projeto.

Este livro nasceu de uma necessidade prática: criar um guia que pudesse ser seguido no dia a dia durante o desenvolvimento de sistemas para bancos e fintechs. Você acompanha a construção das principais camadas de uma aplicação, seguindo o fluxo real de uma requisição: API Gateway, Auth Service, BFF, APIs de domínio e Docker Compose.

No caminho: Spring Boot e Spring Cloud, JWT, Arquitetura Hexagonal, Resilience4j, Rate Limiting com Redis, observabilidade, JPA e PostgreSQL, Flyway, testes e preparação para deploy.

Você pode seguir os capítulos em sequência, usar os exemplos como base para um novo projeto e substituir aquilo que realmente muda de sistema para sistema: as regras de negócio.`,
    credits: { create: [{ role: "Autor", name: "Gilson Bezerra" }] },
  },
  {
    title: "As Crônicas de Havenarth: O Sexto Mago",
    type: "BOOK",
    status: "COMING_SOON",
    featured: true,
    order: -10,
    coverImage: "/img/obras/o-sexto-mago.jpg",
    description: `Seis cavalos voltam da fronteira. Cinco trazem homens sem cabeça. O último arrasta um soldado que ainda grita um nome que ninguém diz há cem anos.

Aidan Dayri é o mais novo de uma patrulha que vive de tomar dinheiro de quem passa na estrada. No outono, matou um homem por engano e ficou com o anel dele. Agora aceita uma moeda para deixar um estranho descalço entrar na capital e não fazer perguntas.

Noanah tem dezesseis anos e quer ser cavaleira. No dia em que vai se inscrever na Academia, reconhece o anel no dedo de um guarda.

Enquanto o rei morre escondido do próprio povo e os conselheiros discutem o preço do carvão, do outro lado do rio alguém cava todas as noites. Estão fazendo gente de barro. E o barro se lembra de quem foi.

Livro um da trilogia As Crônicas de Havenarth.`,
    credits: { create: [{ role: "Autor", name: "Gilson F. Bezerra" }] },
  },
];

// Só preenche onde a sinopse está vazia.
const SINOPSES: Record<string, string> = {
  Diesel:
    "Quando Diesel é demitido do posto onde trabalhou por longos anos, a gerente do posto, e também sobrinha do dono, o convence a bolar um plano para roubarem a grana que seria coletada pela empresa de segurança. Tudo começa a desandar quando Diesel, apelido que Jaime ganhou por só trabalhar na bomba de diesel do posto, decide ir até a favela arrumar uma arma com um antigo amigo de escola.",
  "A Estação das Almas":
    "Três amigos acordam em lugares diferentes de uma cidade misteriosa e cheia de gente agindo estranho. Todos os medos que tinham se manifestam ali e tudo fica muito mais estranho quando o sinal da estação toca anunciando a chegada do trem. Todos correm e se abrigam fugindo dos apanhadores — estranhos seres que caçam pessoas e as levam para a estação onde embarcam para um destino desconhecido.",
};

async function main() {
  for (const [title, description] of Object.entries(SINOPSES)) {
    const r = await prisma.work.updateMany({
      where: { title, OR: [{ description: null }, { description: "" }] },
      data: { description },
    });
    console.log(`Sinopse de ${title}: ${r.count}`);
  }
  for (const data of LANCAMENTOS) {
    const existing = await prisma.work.findFirst({ where: { title: data.title } });
    if (existing) {
      console.log(`Já existe, não alterado: ${data.title}`);
      continue;
    }
    await prisma.work.create({ data });
    console.log(`Cadastrado: ${data.title}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
