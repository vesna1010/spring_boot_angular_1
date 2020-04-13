import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { IBook } from '../models/i-book';
import { Language } from '../enums/language.enum';
import { IPage } from '../models/i-page';
import { IPageable } from '../models/i-pageable';

describe('BookServiceTest', () => {
  let service: BookService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(BookService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should instantiate', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', () => {
    const pageable: IPageable = { page: 0, size: 10, sort: ['id,asc'] };

    service.findAllBooks(pageable).then((page: IPage<IBook>) => {
      expect(page.content.length).toEqual(2);
      expect(page.content[0].title).toEqual('Book A');
      expect(page.content[1].title).toEqual('Book B');
    });

    const request: TestRequest = http.expectOne(BookService.URL + '?page=0&size=10&sort=id,asc');

    request.flush({
      content: [{
        id: 1, title: 'Book A', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      },
      {
        id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      }
      ], number: 0, size: 10, totalPages: 1
    });
  });

  it('should return all books by category id', () => {
    const pageable: IPageable = { page: 0, size: 10, sort: ['id,asc'] };

    service.findAllBooksByCategoryId(1, pageable).then((page: IPage<IBook>) => {
      expect(page.content.length).toEqual(2);
      expect(page.content[0].title).toEqual('Book A');
      expect(page.content[1].title).toEqual('Book B');
    });

    const request: TestRequest = http.expectOne(BookService.URL + '?categoryId=1&page=0&size=10&sort=id,asc');

    request.flush({
      content: [{
        id: 1, title: 'Book A', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      },
      {
        id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      }
      ], number: 0, size: 10, totalPages: 1
    });
  });

  it('should return all books by title', () => {
    const pageable: IPageable = { page: 0, size: 10, sort: ['id,asc'] };

    service.findAllBooksByTitle('Book', pageable).then((page: IPage<IBook>) => {
      expect(page.content.length).toEqual(2);
      expect(page.content[0].title).toEqual('Book A');
      expect(page.content[1].title).toEqual('Book B');
    });

    const request: TestRequest = http.expectOne(BookService.URL + '?title=Book&page=0&size=10&sort=id,asc');

    request.flush({
      content: [{
        id: 1, title: 'Book A', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      },
      {
        id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      }
      ], number: 0, size: 10, totalPages: 1
    });
  });

  it('should return all books by title and language', () => {
    const pageable: IPageable = { page: 0, size: 10, sort: ['id,asc'] };

    service.findAllBooksByTitleAndLanguage('Book', Language.ENGLISH, pageable).then((page: IPage<IBook>) => {
      expect(page.content.length).toEqual(2);
      expect(page.content[0].title).toEqual('Book A');
      expect(page.content[1].title).toEqual('Book B');
    });

    const request: TestRequest = http.expectOne(BookService.URL + '?title=Book&language=ENGLISH&page=0&size=10&sort=id,asc');

    request.flush({
      content: [{
        id: 1, title: 'Book A', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      },
      {
        id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      }
      ], number: 0, size: 10, totalPages: 1
    });
  });

  it('should return book by id', () => {
    service.findBookById(1).then((book: IBook) => {
      expect(book.title).toEqual('Book');
    });

    const request: TestRequest = http.expectOne(`${BookService.URL}/1`);

    request.flush({
      id: 1, title: 'Book', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author' }], content: null
    });
  });

  it('should return book content by id', () => {
    service.findBookContentById(1).then((data: ArrayBuffer) => {
      expect(data.byteLength).toEqual(8);
    });

    const request: TestRequest = http.expectOne(`${BookService.URL}/1/content`);

    request.flush(new ArrayBuffer(8));
  });

  it('should save book', () => {
    service.saveBook({
      id: null, title: 'Book', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author' }], content: null
    }).then((book: IBook) => {
      expect(book.id).toEqual(1);
    });

    const request: TestRequest = http.expectOne(BookService.URL);

    request.flush({
      id: 1, title: 'Book', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author' }], content: null
    });
  });

  it('should update book', () => {
    service.updateBook({
      id: 1, title: 'Book', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author' }], content: null
    }).then((book: IBook) => {
      expect(book.title).toEqual('Book');
    });

    const request: TestRequest = http.expectOne(`${BookService.URL}/1`);

    request.flush({
      id: 1, title: 'Book', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author' }], content: null
    });
  });

  it('should delete book by id', () => {
    service.deleteBookById(1).then((value: any) => {
      expect(value).toBeNull();
    });

    const request: TestRequest = http.expectOne(`${BookService.URL}/1`);

    request.flush(null);
  });

});

