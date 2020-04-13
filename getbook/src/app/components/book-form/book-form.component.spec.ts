import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { BookFormComponent } from './book-form.component';
import { Language } from 'src/app/enums/language.enum';
import { CategoryService } from 'src/app/services/category.service';
import { AuthorService } from 'src/app/services/author.service';

describe('BookFormComponentTest', () => {
  let fixture: ComponentFixture<BookFormComponent>;
  let component: BookFormComponent;
  let debugElement: DebugElement;
  let categoryService: CategoryService;
  let authorService: AuthorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [BookFormComponent],
      providers: [CategoryService, AuthorService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    categoryService = TestBed.get(CategoryService);
    authorService = TestBed.get(AuthorService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show "Loading data. Please wait..."', () => {
    fixture.detectChanges();

    expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('Loading data. Please wait...');
  });

  it('should show the completed form', () => {
    component.categories = [{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }];
    component.authors = [{ id: 1, name: 'Author A', email: 'authorA@gmail.com' }, { id: 2, name: 'Author B', email: 'authorB@gmail.com' }];
    component.book = {
      id: 1, title: 'Book', isbn: '978-1-4842-3648-2', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
      authors: [{ id: 1, name: 'Author A', email: 'authorA@gmail.com' }], content: null, description: 'Description'
    };

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(debugElement.queryAll(By.css('#category option')).length).toEqual(2);
      expect(debugElement.queryAll(By.css('#authors option')).length).toEqual(2);
      expect(debugElement.query(By.css('#id')).nativeElement.value).toEqual('1');
      expect(debugElement.query(By.css('#title')).nativeElement.value).toEqual('Book');
      expect(debugElement.query(By.css('#isbn')).nativeElement.value).toEqual('978-1-4842-3648-2');
      expect(debugElement.query(By.css('#language')).nativeElement.value).toEqual('ENGLISH');
      expect(debugElement.query(By.css('#category')).nativeElement.selectedIndex).toEqual(0);
      expect(debugElement.query(By.css('#authors')).nativeElement.selectedIndex).toEqual(0);
      expect(debugElement.query(By.css('#description')).nativeElement.value).toEqual('Description');
      expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Update');
    });

  });

  it('should initialize authors and categories', async(() => {
    const spy1 = spyOn(categoryService, 'findAllCategories').and.callFake((params: any): any => {
      if (params.hasOwnProperty('order')) {
        return Promise.resolve([{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }]);
      } else {
        return Promise.resolve({
          number: 0, size: 10, totalPages: 1, content: [{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }]
        });
      }
    });

    const spy2 = spyOn(authorService, 'findAllAuthors').and.callFake((params: any): any => {
      if (params.hasOwnProperty('order')) {
        return Promise.resolve([{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }]);
      } else {
        return Promise.resolve({
          number: 0, size: 10, totalPages: 1, content: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }]
        });
      }
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith({ order: ['name,asc'] });
      expect(spy2).toHaveBeenCalledWith({ order: ['name,asc', 'id,asc'] });

      expect(component.authors.length).toEqual(2);
      expect(component.authors[0].name).toEqual('Author A');
      expect(component.authors[1].name).toEqual('Author B');

      expect(component.categories.length).toEqual(2);
      expect(component.categories[0].name).toEqual('Category A');
      expect(component.categories[1].name).toEqual('Category B');
    });

    component.ngOnInit();
  }));

  it('should test categories', () => {
    expect(component.isEqualCategories({ id: 1, name: 'Category' }, { id: 1, name: 'Category' })).toBeTruthy();
    expect(component.isEqualCategories({ id: 2, name: 'Category' }, { id: 1, name: 'Category' })).toBeFalsy();
  });

  it('should test authors', () => {
    expect(component.isEqualCategories({ id: 1, name: 'Author' }, { id: 1, name: 'Author' })).toBeTruthy();
    expect(component.isEqualCategories({ id: 2, name: 'Author' }, { id: 1, name: 'Author' })).toBeFalsy();
  });

  it('should set book content', () => {
    component.book = {
      id: null, title: null, isbn: null, language: null, category: null, authors: null, content: null
    };

    const file: File = new File(["test"], "test.pdf");

    component.setBookContent(file);

    BookFormComponent.fileReader.onloadend = () => {
      expect(component.book.content.length).toEqual(4);
    }

  });

  it('should emit onsave event', () => {
    component.save.subscribe((value: any) => {
      expect(value).toBeUndefined();
    });

    component.onSubmit();
  });

});

