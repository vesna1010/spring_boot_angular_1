import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/i-category';
import { IPage } from 'src/app/models/i-page';
import { IPageable } from 'src/app/models/i-pageable';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  page: IPage<ICategory>;
  params: { [param: string]: string | number | string[] };

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const page: number = + paramMap.get('page');
      const size: number = + paramMap.get('size');
      const sort: string[] = paramMap.getAll('sort');
      const pageable: IPageable = { page, size, sort };

      this.categoryService.findAllCategories(pageable).then(
        (data: IPage<ICategory>) => {
          this.page = data;
          this.params = { page: data.number, size: data.size, sort };
        });
    });
  }

  deleteCategoryById(id: number) {
    this.categoryService.deleteCategoryById(id).then(
      () => {
        this.ngOnInit();
      });
  }

}
