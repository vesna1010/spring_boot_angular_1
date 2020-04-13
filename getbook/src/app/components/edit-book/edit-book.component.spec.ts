import { EditBookComponent } from './edit-book.component';
import { DebugElement } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { BookFormComponent } from '../book-form/book-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Language } from 'src/app/enums/language.enum';
import { Router, ActivatedRoute } from '@angular/router';

describe('EditBookComponentTest', () => {
  let fixture: ComponentFixture<EditBookComponent>;
  let component: EditBookComponent;
  let debugElement: DebugElement;
  let bookService: BookService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [EditBookComponent, BookFormComponent],
      providers: [BookService, {
        provide: ActivatedRoute, useValue: {
          snapshot: { params: { id: 1 } }
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    bookService = TestBed.get(BookService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show "Loading data. Please wait..."', () => {
    fixture.detectChanges();

    expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('Loading data. Please wait...');
  });

  it('should show form element', () => {
    component.book = {
      id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author A', email: 'authorA@gmail.com' }], content: null, description: 'Description'
    };

    fixture.detectChanges();

    expect(debugElement.queryAll(By.css('app-book-form')).length).toEqual(1);
  });

  it('should return book by id', async(() => {
    const spy = spyOn(bookService, 'findBookById').and.returnValue(
      Promise.resolve({
        id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
        authors: [{ id: 1, name: 'Author A', email: 'authorA@gmail.com' }], content: null, description: 'Description'
      }));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(1);
      expect(component.book.id).toEqual(1);
      expect(component.book.title).toEqual('Book');
      expect(component.book.authors.length).toEqual(1);
    });

    component.ngOnInit();
  }));

  it('should show error message', async(() => {
    const spy1 = spyOn(bookService, 'findBookById').and.returnValue(
      Promise.reject({ error: { message: 'No book with id 1' } }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith('No book with id 1');
      expect(spy3).toHaveBeenCalledWith('/books/form');
    });

    component.ngOnInit();
  }));

  it('should update book', async(() => {
    component.book = {
      id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH,
      category: { id: 1, name: 'Category A' }, authors: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }], content: null
    };

    const spy1 = spyOn(bookService, 'updateBook').and.returnValue(Promise.resolve({
      id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH,
      category: { id: 1, name: 'Category A' }, authors: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }], content: null
    }));
    const spy2 = spyOn(window, 'alert');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith({
        id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH,
        category: { id: 1, name: 'Category A' }, authors: [{ id: 1, name: 'Author A' },
        { id: 2, name: 'Author B' }], content: null
      });

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Updated');
        expect(component.book).toEqual({
          id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH,
          category: { id: 1, name: 'Category A' }, authors: [{ id: 1, name: 'Author A' },
          { id: 2, name: 'Author B' }], content: null
        });
      });

    });

    component.updateBook();
  }));

});
