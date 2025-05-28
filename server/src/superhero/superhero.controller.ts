import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  create() {
    return this.superheroService.create();
  }

  @Get()
  async getAll() {
    return this.superheroService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.superheroService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSuperheroDto) {
    return this.superheroService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superheroService.remove(id);
  }
}
