import { api } from '../api';
import { API } from '../constants';
import type { Superhero, SuperheroEditInput } from '../../types/superhero.types';

class SuperheroService {
  async create() {
    return api.post<string>(API.superhero());
  }
  async getAll() {
    return api.get<Superhero[]>(API.superhero());
  }

  async getById(id: string) {
    return api.get<Superhero>(API.superhero(id));
  }

  async update(id: string, data: SuperheroEditInput) {
    return api.patch<Superhero>(API.superhero(`${id}`), data);
  }

  async remove(id: string) {
    return api.delete<Superhero>(API.superhero(`${id}`));
  }
}

export const superheroService = new SuperheroService();
