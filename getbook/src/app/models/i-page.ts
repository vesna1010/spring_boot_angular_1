export interface IPage<T> {
  content: T[];
  number: number;
  size: number;
  totalPages: number;
}