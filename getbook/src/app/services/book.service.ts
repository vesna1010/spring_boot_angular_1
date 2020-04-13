import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../models/i-book';
import { IPage } from '../models/i-page';
import { IPageable } from '../models/i-pageable';
import { Language } from '../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  static URL = 'http://localhost:8080/bookservice/books';

  constructor(private http: HttpClient) { }

  findAllBooks(pageable: IPageable): Promise<IPage<IBook>> {
    return this.http.get<IPage<IBook>>(BookService.URL, {
      params: { page: `${pageable.page}`, size: `${pageable.size}`, sort: pageable.sort }
    }).toPromise();
  }

  findAllBooksByCategoryId(categoryId: number, pageable: IPageable): Promise<IPage<IBook>> {
    return this.http.get<IPage<IBook>>(BookService.URL, {
      params: { categoryId: `${categoryId}`, page: `${pageable.page}`, size: `${pageable.size}`, sort: pageable.sort }
    }).toPromise();
  }

  findAllBooksByTitle(title: string, pageable: IPageable): Promise<IPage<IBook>> {
    return this.http.get<IPage<IBook>>(BookService.URL, {
      params: { title, page: `${pageable.page}`, size: `${pageable.size}`, sort: pageable.sort }
    }).toPromise();
  }

  findAllBooksByTitleAndLanguage(title: string, language: Language, pageable: IPageable): Promise<IPage<IBook>> { 
    return this.http.get<IPage<IBook>>(BookService.URL, {
      params: { title, language: `${language}`, page: `${pageable.page}`, size: `${pageable.size}`, sort: pageable.sort }
    }).toPromise();
  }

  findBookById(id: number): Promise<IBook> {
    return this.http.get<IBook>(`${BookService.URL}/${id}`).toPromise();
  }

  findBookContentById(id: number): Promise<ArrayBuffer> {
    return this.http.get<ArrayBuffer>(`${BookService.URL}/${id}/content`, { responseType: 'arraybuffer' as 'json' }).toPromise();
  }

  saveBook(book: IBook): Promise<IBook> {
    return this.http.post<IBook>(BookService.URL, book).toPromise();
  }

  updateBook(book: IBook): Promise<IBook> {
    return this.http.put<IBook>(`${BookService.URL}/${book.id}`, book).toPromise();
  }

  deleteBookById(id: number): Promise<void> {
    return this.http.delete<void>(`${BookService.URL}/${id}`).toPromise();
  }

}

