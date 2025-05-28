import { api } from '../api';
import { API } from '../constants';
import type { File } from '../../types/file.types';

class FileService {
  async upload(file: FormData, folder: string) {
    return api.post<File[]>(API.files(), file, {
      params: { folder },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const filesService = new FileService();
