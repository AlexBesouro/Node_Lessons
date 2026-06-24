import { PrismaClient } from "./prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
    const data = await prisma.films.findMany();
    console.log("Data:", data);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
