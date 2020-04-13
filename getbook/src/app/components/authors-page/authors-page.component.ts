import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { IAuthor } from 'src/app/models/i-author';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IPage } from 'src/app/models/i-page';
import { IPageable } from 'src/app/models/i-pageable';

@Component({
  selector: 'app-authors-page',
  templateUrl: './authors-page.component.html',
  styleUrls: ['./authors-page.component.css']
})
export class AuthorsPageComponent implements OnInit {
  page: IPage<IAuthor>;
  params: { [param: string]: string | number | string[] };

  constructor(
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const page: number = + paramMap.get('page');
      const size: number = + paramMap.get('size');
      const sort: string[] = paramMap.getAll('sort');
      const pageable: IPageable = { page, size, sort };

      this.authorService.findAllAuthors(pageable).then(
        (data: IPage<IAuthor>) => {
          this.page = data;
          this.params = { page: data.number, size: data.size, sort };
        });
    });
  }

  deleteAuthorById(id: number) {
    this.authorService.deleteAuthorById(id).then(
      () => {
        this.ngOnInit();
      });
  }

}
