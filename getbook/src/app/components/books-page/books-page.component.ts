import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { IPage } from 'src/app/models/i-page';
import { IBook } from 'src/app/models/i-book';
import { IPageable } from 'src/app/models/i-pageable';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {
  page: IPage<IBook>;
  params: { [param: string]: string | number | string[] };

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const page: number = + paramMap.get('page');
      const size: number = + paramMap.get('size');
      const sort: string[] = paramMap.getAll('sort');
      const pageable: IPageable = { page, size, sort };

      this.bookService.findAllBooks(pageable).then(
        (data: IPage<IBook>) => {
          this.page = data;
          this.params = { page: data.number, size: data.size, sort };
        });
    });
  }

  deleteBookById(id: number) {
    this.bookService.deleteBookById(id).then(
      () => {
        this.ngOnInit();
      });
  }

}
