import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { IAuthor } from '../models/i-author';
import { ISort } from '../models/i-sort';
import { IPageable } from '../models/i-pageable';
import { IPage } from '../models/i-page';

describe('AuthorServiceTest', () => {
  let service: AuthorService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(AuthorService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should instantiate', () => {
    expect(service).toBeDefined();
  });

  it('should return all authors', () => {
    const sort: ISort = { order: ['id,asc'] };

    service.findAllAuthors(sort).then((authors: IAuthor[]) => {
      expect(authors.length).toEqual(2);
      expect(authors[0].name).toEqual('Author A');
      expect(authors[1].name).toEqual('Author B');
    });

    const request: TestRequest = http.expectOne(AuthorService.URL + '?sort=id,asc');

    request.flush([{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }]);
  });

  it('should return page with authors', () => {
    const pageable: IPageable = { page: 0, size: 10, sort: ['id,asc'] };

    service.findAllAuthors(pageable).then((page: IPage<IAuthor>) => {
      expect(page.content.length).toEqual(2);
      expect(page.content[0].name).toEqual('Author A');
      expect(page.content[1].name).toEqual('Author B');
    });

    const request: TestRequest = http.expectOne(AuthorService.URL + '?page=0&size=10&sort=id,asc');

    request.flush({
      page: 0, size: 10, totalPages: 1,
      content: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }]
    });
  });

  it('should return author by id', () => {
    service.findAuthorById(1).then((author: IAuthor) => {
      expect(author.name).toEqual('Author');
    });

    const request: TestRequest = http.expectOne(`${AuthorService.URL}/1`);

    request.flush({ id: 1, name: 'Author' });
  });

  it('should save author', () => {
    service.saveAuthor({ id: null, name: 'Author' }).then((author: IAuthor) => {
      expect(author.id).toEqual(1);
    });

    const request: TestRequest = http.expectOne(AuthorService.URL);

    request.flush({ id: 1, name: 'Author' });
  });

  it('should update author', () => {
    service.updateAuthor({ id: 1, name: 'Author' }).then((author: IAuthor) => {
      expect(author.name).toEqual('Author');
    });

    const request: TestRequest = http.expectOne(`${AuthorService.URL}/1`);

    request.flush({ id: 1, name: 'Author' });
  });

  it('should delete author by id', () => {
    service.deleteAuthorById(1).then((value: any) => {
      expect(value).toBeNull();
    });

    const request: TestRequest = http.expectOne(`${AuthorService.URL}/1`);

    request.flush(null);
  });

});
