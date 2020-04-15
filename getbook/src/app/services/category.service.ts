import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/i-category';
import { ISort } from '../models/i-sort';
import { IPageable } from '../models/i-pageable';
import { IPage } from '../models/i-page';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  static readonly URL = 'http://localhost:8080/bookservice/categories';

  constructor(private http: HttpClient) { }

  findAllCategories(params: ISort): Promise<ICategory[]>;

  findAllCategories(params: IPageable): Promise<IPage<ICategory>>;

  findAllCategories(params: any): any {
    if (params.hasOwnProperty('order')) {
      return this.http.get<ICategory[]>(CategoryService.URL, {
        params: { sort: params.order }
      }).toPromise();
    } else {
      return this.http.get<IPage<ICategory>>(CategoryService.URL, {
        params: { page: `${params.page}`, size: `${params.size}`, sort: params.sort }
      }).toPromise();
    }
  }

  findCategoryById(id: number): Promise<ICategory> {
    return this.http.get<ICategory>(`${CategoryService.URL}/${id}`).toPromise();
  }

  saveCategory(category: ICategory): Promise<ICategory> {
    return this.http.post<ICategory>(CategoryService.URL, category).toPromise();
  }

  updateCategory(category: ICategory): Promise<ICategory> {
    return this.http.put<ICategory>(`${CategoryService.URL}/${category.id}`, category).toPromise();
  }

  deleteCategoryById(id: number): Promise<void> {
    return this.http.delete<void>(`${CategoryService.URL}/${id}`).toPromise();
  }

}


