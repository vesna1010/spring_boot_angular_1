import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { DisplayBookComponent } from './display-book.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Language } from 'src/app/enums/language.enum';
import { By } from '@angular/platform-browser';
import { BookService } from 'src/app/services/book.service';

describe('DisplayBookComponentTest', () => {
  let fixture: ComponentFixture<DisplayBookComponent>;
  let component: DisplayBookComponent;
  let debugElement: DebugElement;
  let bookService: BookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DisplayBookComponent],
      providers: [BookService]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBookComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    bookService = TestBed.get(BookService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display book', () => {
    component.book = {
      id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }], content: null
    };

    fixture.detectChanges();

    const spanElements: HTMLSpanElement[] = debugElement.queryAll(By.css('span')).map((span) => span.nativeElement);

    expect(debugElement.query(By.css('h3')).nativeElement.textContent).toEqual('Book');
    expect(spanElements.length).toEqual(2);
    expect(spanElements[0].textContent.trim()).toEqual('Author A,');
    expect(spanElements[1].textContent.trim()).toEqual('Author B,');
  });

  it('should download book by id', async(() => {
    component.book = {
      id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }], content: null
    };

    const spy = spyOn(bookService, 'findBookContentById').and.returnValue(Promise.resolve(new ArrayBuffer(128)));
    
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(1);
    });

    component.downloadBook();
  }));

});
