import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { ICategory } from '../models/i-category';
import { ISort } from '../models/i-sort';
import { IPageable } from '../models/i-pageable';
import { IPage } from '../models/i-page';

describe('CategoryServiceTest', () => {
  let service: CategoryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(CategoryService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should instantiate', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories', () => {
    const sort: ISort = { order: ['id,asc'] };

    service.findAllCategories(sort).then((categories: ICategory[]) => {
      expect(categories.length).toEqual(2);
      expect(categories[0].name).toEqual('Category A');
      expect(categories[1].name).toEqual('Category B');
    });

    const request: TestRequest = http.expectOne(CategoryService.URL + '?sort=id,asc');

    request.flush([{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }]);
  });

  it('should return page with categories', () => {
    const pageable: IPageable = { page: 0, size: 10, sort: ['id,asc'] };

    service.findAllCategories(pageable).then((page: IPage<ICategory>) => {
      expect(page.content.length).toEqual(2);
      expect(page.content[0].name).toEqual('Category A');
      expect(page.content[1].name).toEqual('Category B');
    });

    const request: TestRequest = http.expectOne(CategoryService.URL + '?page=0&size=10&sort=id,asc');

    request.flush({
      page: 0, size: 10, totalPages: 1,
      content: [{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }]
    });
  });


  it('should return category by id', () => {
    service.findCategoryById(1).then((category: ICategory) => {
      expect(category.name).toEqual('Category');
    });

    const request: TestRequest = http.expectOne(`${CategoryService.URL}/1`);

    request.flush({ id: 1, name: 'Category' });
  });

  it('should save category', () => {
    service.saveCategory({ id: null, name: 'Category' }).then((category: ICategory) => {
      expect(category.id).toEqual(1);
    });

    const request: TestRequest = http.expectOne(CategoryService.URL);

    request.flush({ id: 1, name: 'Category' });
  });

  it('should update category', () => {
    service.updateCategory({ id: 1, name: 'Category' }).then((category: ICategory) => {
      expect(category.name).toEqual('Category');
    });

    const request: TestRequest = http.expectOne(`${CategoryService.URL}/1`);

    request.flush({ id: 1, name: 'Category' });
  });

  it('should delete category by id', () => {
    service.deleteCategoryById(1).then((value: any) => {
      expect(value).toBeNull();
    });

    const request: TestRequest = http.expectOne(`${CategoryService.URL}/1`);

    request.flush(null);
  });

});
