import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AuthorsPageComponent } from './authors-page.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AuthorsPageComponentTest', () => {
  let fixture: ComponentFixture<AuthorsPageComponent>;
  let component: AuthorsPageComponent;
  let debugElement: DebugElement;
  let authorService: AuthorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AuthorsPageComponent, PaginationComponent],
      providers: [AuthorService, {
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
    fixture = TestBed.createComponent(AuthorsPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authorService = TestBed.get(AuthorService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show "Loading data. Please wait..."', () => {
    fixture.detectChanges();

    expect(debugElement.query(By.css('td')).nativeElement.textContent).toEqual('Loading data. Please wait...');
  });

  it('should show "No Data"', () => {
    component.page = { number: 0, size: 10, totalPages: 0, content: [] };

    fixture.detectChanges();

    expect(debugElement.query(By.css('td')).nativeElement.textContent).toEqual('No Data');
  });

  it('should show table with authors', () => {
    component.page = {
      number: 0, size: 10, totalPages: 1,
      content: [{ id: 1, name: 'Author A' }, { id: 2, name: 'Author B' }]
    };
    component.params = { page: 0, size: 10, sort: ['id,asc'] };

    fixture.detectChanges();

    expect(debugElement.queryAll(By.css('td'))[1].nativeElement.textContent).toEqual('Author A');
    expect(debugElement.queryAll(By.css('td'))[6].nativeElement.textContent).toEqual('Author B');
    expect(debugElement.query(By.css('nav')).nativeElement.textContent).toEqual('Previous1Next');
  });

  it('should return authors', async(() => {
    const spy = spyOn(authorService, 'findAllAuthors').and.callFake((params: any): any => {
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
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id,asc'] });
      expect(component.page.content.length).toEqual(2);
      expect(component.page.content[0].name).toEqual('Author A');
      expect(component.page.content[1].name).toEqual('Author B');
      expect(component.params).toEqual({ page: 0, size: 10, sort: ['id,asc'] });
    });

    component.ngOnInit();
  }));

  it('should delete author by id', async(() => {
    const spy1 = spyOn(authorService, 'deleteAuthorById').and.returnValue(Promise.resolve());
    const spy2 = spyOn(authorService, 'findAllAuthors').and.callFake((params: any): any => {
      if (params.hasOwnProperty('order')) {
        return Promise.resolve([{ id: 2, name: 'Author B' }]);
      } else {
        return Promise.resolve({
          page: 0, size: 10, totalPages: 1, content: [{ id: 2, name: 'Author B' }]
        });
      }
    });

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id,asc'] });
    });

    component.deleteAuthorById(1);
  }));

});
