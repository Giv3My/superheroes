import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { FileService } from 'src/file/file.service';
import { superheroSelection } from './utils';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Injectable()
export class SuperheroService {
  constructor(
    private readonly fileService: FileService,
    private readonly prismaService: PrismaService
  ) {}

  async create() {
    const superhero = await this.prismaService.superhero.create({
      data: {},
    });

    return superhero.id;
  }

  getAll() {
    return this.prismaService.superhero.findMany({
      select: superheroSelection,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: string) {
    const superhero = await this.prismaService.superhero.findUnique({
      where: {
        id,
      },
      select: superheroSelection,
    });

    if (!superhero) {
      throw new NotFoundException('Superhero was not found!');
    }

    return superhero;
  }

  update(id: string, dto: UpdateSuperheroDto) {
    return this.prismaService.superhero.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const removedSuperhero = await this.prismaService.superhero.delete({
      where: { id },
    });

    await this.fileService.deleteFile(`/uploads/superheroes/${id}`);

    return removedSuperhero;
  }
}
