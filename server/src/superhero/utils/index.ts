import type { Prisma } from '@prisma/client';

export const superheroSelection: Prisma.SuperheroSelect = {
  id: true,
  realName: true,
  nickname: true,
  originDescription: true,
  superpowers: true,
  catchPhrase: true,
  images: true,
  createdAt: true,
};
