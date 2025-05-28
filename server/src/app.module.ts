import { Module } from '@nestjs/common';
import { SuperheroModule } from './superhero/superhero.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [SuperheroModule, FileModule],
})
export class AppModule {}
