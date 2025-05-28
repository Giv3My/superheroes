import { Module } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { SuperheroController } from './superhero.controller';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Module({
  controllers: [SuperheroController],
  providers: [SuperheroService, FileService, PrismaService],
})
export class SuperheroModule {}
