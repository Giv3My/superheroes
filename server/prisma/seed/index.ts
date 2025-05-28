import { PrismaService } from '../prisma.service';
import { data } from './data';

const prismaService = new PrismaService();

const up = async () => {
  await prismaService.superhero.createMany({
    data,
  });
};

const down = async () => {
  await prismaService.$executeRaw`TRUNCATE TABLE "superhero" RESTART IDENTITY CASCADE`;
};

const main = async () => {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
};

main()
  .then(async () => {
    await prismaService.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prismaService.$disconnect();
    process.exit(1);
  });
