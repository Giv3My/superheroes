import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import type { FileResponse } from './types';
import { ensureDir, remove, writeFile, exists } from 'fs-extra';

@Injectable()
export class FileService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'default'
  ): Promise<FileResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadFolder);

    const response: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

        return {
          url: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        };
      })
    );

    return response;
  }

  async deleteFile(filePath: string) {
    const fullPath = `${path}/${filePath}`;
    const fileExists = await exists(fullPath);

    if (!fileExists) {
      return;
    }

    await remove(fullPath);
  }
}
