import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { BooksPageComponent } from './books-page.component';
import { BookService } from 'src/app/services/book.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { Language } from 'src/app/enums/language.enum';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BooksPageComponentTest', () => {
  let fixture: ComponentFixture<BooksPageComponent>;
  let component: BooksPageComponent;
  let debugElement: DebugElement;
  let bookService: BookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [BooksPageComponent, PaginationComponent],
      providers: [BookService, {
        provide: ActivatedRoute, useValue: {
          queryParamMap: of({
            page: '0',
            size: '10',
            sort: 'id,asc',

            get(key: string): string {
              return this[key];
            },

            getAll(key: string): string[] {
              return [this[key]];
            }
          })
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    bookService = TestBed.get(BookService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show "Loading data. Please wait..."', () => {
    fixture.detectChanges();

    expect(debugElement.query(By.css('td')).nativeElement.textContent).toEqual('Loading data. Please wait...');
  });

  it('should show "No Data"', () => {
    component.page = { content: [], number: 0, size: 10, totalPages: 0 };

    fixture.detectChanges();

    expect(debugElement.query(By.css('td')).nativeElement.textContent).toEqual('No Data');
  });

  it('should show table with books', () => {
    component.page = {
      content: [{
        id: 1, title: 'Book A', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      },
      {
        id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      }
      ], number: 0, size: 10, totalPages: 1
    };
    component.params = { page: 0, size: 10, sort: ['id,asc'] };

    fixture.detectChanges();

    expect(debugElement.queryAll(By.css('td'))[1].nativeElement.textContent).toEqual('Book A');
    expect(debugElement.queryAll(By.css('td'))[8].nativeElement.textContent).toEqual('Book B');
    expect(debugElement.query(By.css('nav')).nativeElement.textContent).toEqual('Previous1Next');
  });

  it('should return books', async(() => {
    const spy = spyOn(bookService, 'findAllBooks').and.returnValue(Promise.resolve({
      content: [{
        id: 1, title: 'Book A', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      },
      {
        id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author' }], content: null
      }
      ], number: 0, size: 10, totalPages: 1
    }));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id,asc'] });
      expect(component.page.content.length).toEqual(2);
      expect(component.page.content[0].title).toEqual('Book A');
      expect(component.page.content[1].title).toEqual('Book B');
      expect(component.params).toEqual({ page: 0, size: 10, sort: ['id,asc'] });
    });

    component.ngOnInit();
  }));

  it('should delete book by id', async(() => {
    const spy1 = spyOn(bookService, 'deleteBookById').and.returnValue(Promise.resolve());
    const spy2 = spyOn(bookService, 'findAllBooks').and.returnValue(Promise.resolve({
      content: [
        {
          id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
          authors: [{ id: 1, name: 'Author' }], content: null
        }
      ], number: 0, size: 10, totalPages: 1
    }));

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id,asc'] });
    });

    component.deleteBookById(1);
  }));

});

