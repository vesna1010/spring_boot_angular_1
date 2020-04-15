import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuthor } from '../models/i-author';
import { IPage } from '../models/i-page';
import { ISort } from '../models/i-sort';
import { IPageable } from '../models/i-pageable';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  static readonly URL = 'http://localhost:8080/bookservice/authors';

  constructor(private http: HttpClient) { }

  findAllAuthors(params: ISort): Promise<IAuthor[]>;

  findAllAuthors(params: IPageable): Promise<IPage<IAuthor>>;

  findAllAuthors(params: any): any {
    if (params.hasOwnProperty('order')) {
      return this.http.get<IAuthor[]>(AuthorService.URL, {
        params: { sort: params.order }
      }).toPromise();
    } else {
      return this.http.get<IPage<IAuthor>>(AuthorService.URL, {
        params: { page: `${params.page}`, size: `${params.size}`, sort: params.sort }
      }).toPromise();
    }
  }

  findAuthorById(id: number): Promise<IAuthor> {
    return this.http.get<IAuthor>(`${AuthorService.URL}/${id}`).toPromise();
  }

  saveAuthor(author: IAuthor): Promise<IAuthor> {
    return this.http.post<IAuthor>(AuthorService.URL, author).toPromise();
  }

  updateAuthor(author: IAuthor): Promise<IAuthor> {
    return this.http.put<IAuthor>(`${AuthorService.URL}/${author.id}`, author).toPromise();
  }

  deleteAuthorById(id: number): Promise<void> {
    return this.http.delete<void>(`${AuthorService.URL}/${id}`).toPromise();
  }

}
