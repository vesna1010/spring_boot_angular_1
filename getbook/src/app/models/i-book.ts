import { Language } from '../enums/language.enum';
import { ICategory } from './i-category';
import { IAuthor } from './i-author';

export interface IBook {
  id: number;
  title: string;
  isbn: string;
  language: Language;
  category: ICategory;
  authors: IAuthor[];
  content: number[];
  image?: number[];
  description?: string;
}
