import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IPage } from 'src/app/models/i-page';
import { IBook } from 'src/app/models/i-book';
import { BookService } from 'src/app/services/book.service';
import { ICategory } from 'src/app/models/i-category';
import { CategoryService } from 'src/app/services/category.service';
import { Language } from 'src/app/enums/language.enum';
import { IPageable } from 'src/app/models/i-pageable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Object = Object;
  Language = Language;

  categoryId: number;
  title: string;
  language: Language;
  categories: ICategory[];
  page: IPage<IBook>;
  params: { [key: string]: string | number | string[] };

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const page: number = + paramMap.get('page');
      const size: number = + paramMap.get('size');
      const sort: string[] = paramMap.getAll('sort');
      const pageable: IPageable = { page, size, sort };

      this.categoryId = + paramMap.get('categoryId');
      this.title = paramMap.get('title');
      this.language = Language[paramMap.get('language')];

      if (this.categoryId) {
        this.findAllBooksByCategoryId(this.categoryId, pageable);
      } else if (this.title && this.language) {
        this.findAllBooksByTitleAndLanguage(this.title, this.language, pageable);
      } else if (this.title) {
        this.findAllBooksByTitle(this.title, pageable);
      } else {
        this.findAllBooks(pageable);
      }

    });

    this.categoryService.findAllCategories({ order: ['name,asc', 'id,asc'] }).then(
      (data: ICategory[]) => {
        this.categories = data;
      });
  }

  findAllBooksByCategoryId(categoryId: number, pageable: IPageable) {
    this.bookService.findAllBooksByCategoryId(categoryId, pageable).then(
      (data: IPage<IBook>) => {
        this.page = data;
        this.params = { categoryId, page: data.number, size: data.size, sort: pageable.sort };
      });
  }

  findAllBooksByTitleAndLanguage(title: string, language: Language, pageable: IPageable) {
    this.bookService.findAllBooksByTitleAndLanguage(title, language, pageable).then(
      (data: IPage<IBook>) => {
        this.page = data;
        this.params = { title, language: `${language}`, page: data.number, size: data.size, sort: pageable.sort };
      });
  }

  findAllBooksByTitle(title: string, pageable: IPageable) {
    this.bookService.findAllBooksByTitle(title, pageable).then(
      (data: IPage<IBook>) => {
        this.page = data;
        this.params = { title, page: data.number, size: data.size, sort: pageable.sort };
      });
  }

  findAllBooks(pageable) {
    this.bookService.findAllBooks(pageable).then(
      (data: IPage<IBook>) => {
        this.page = data;
        this.params = { page: data.number, size: data.size, sort: pageable.sort };
      });
  }

}
