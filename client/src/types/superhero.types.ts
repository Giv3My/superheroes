export interface Superhero {
  id: string;
  realName: string;
  nickname: string;
  originDescription: string;
  superpowers: string[];
  catchPhrase: string;
  images: string[];
}
export interface SuperheroEditInput extends Omit<Superhero, 'id'> {}
