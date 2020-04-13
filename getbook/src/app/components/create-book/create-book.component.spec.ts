import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CreateBookComponent } from './create-book.component';
import { BookService } from 'src/app/services/book.service';
import { BookFormComponent } from '../book-form/book-form.component';
import { Language } from 'src/app/enums/language.enum';

describe('CreateBookComponentTest', () => {
  let fixture: ComponentFixture<CreateBookComponent>;
  let component: CreateBookComponent;
  let debugElement: DebugElement;
  let router: Router;
  let bookService: BookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [CreateBookComponent, BookFormComponent],
      providers: [BookService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = TestBed.get(Router);
    bookService = TestBed.get(BookService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show form element', () => {
    expect(debugElement.queryAll(By.css('app-book-form')).length).toEqual(1);
  });

  it('should save book', async(() => {
    component.book = {
      id: null, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH,
      category: { id: 1, name: 'Category A' }, authors: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }], content: []
    };

    const spy1 = spyOn(bookService, 'saveBook').and.returnValue(Promise.resolve({
      id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH,
      category: { id: 1, name: 'Category A' }, authors: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }], content: []
    }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith({
        id: null, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH,
        category: { id: 1, name: 'Category A' }, authors: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }], content: []
      });

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Saved');
        expect(spy3).toHaveBeenCalledWith('/books/form/1');
      });
    });

    component.saveBook();
  }));

});

