import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from '../pagination/pagination.component';
import { CategoriesPageComponent } from './categories-page.component';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CategoriesPageComponentTest', () => {
  let fixture: ComponentFixture<CategoriesPageComponent>;
  let component: CategoriesPageComponent;
  let debugElement: DebugElement;
  let categoryService: CategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CategoriesPageComponent, PaginationComponent],
      providers: [CategoryService, {
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
    fixture = TestBed.createComponent(CategoriesPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    categoryService = TestBed.get(CategoryService);
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

  it('should show table with categories', () => {
    component.page = {
      number: 0, size: 10, totalPages: 1,
      content: [{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }]
    };
    component.params = { page: 0, size: 10, sort: ['id,asc'] };

    fixture.detectChanges();

    expect(debugElement.queryAll(By.css('td'))[1].nativeElement.textContent).toEqual('Category A');
    expect(debugElement.queryAll(By.css('td'))[5].nativeElement.textContent).toEqual('Category B');
    expect(debugElement.query(By.css('nav')).nativeElement.textContent).toEqual('Previous1Next');
  });

  it('should return categories', async(() => {
    const spy = spyOn(categoryService, 'findAllCategories').and.callFake((params: any): any => {
      if (params.hasOwnProperty('order')) {
        return Promise.resolve([{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }]);
      } else {
        return Promise.resolve({
          number: 0, size: 10, totalPages: 1, content: [{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }]
        });
      }
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id,asc'] });
      expect(component.page.content.length).toEqual(2);
      expect(component.page.content[0].name).toEqual('Category A');
      expect(component.page.content[1].name).toEqual('Category B');
      expect(component.params).toEqual({ page: 0, size: 10, sort: ['id,asc'] });
    });

    component.ngOnInit();
  }));

  it('should delete category by id', async(() => {
    const spy1 = spyOn(categoryService, 'deleteCategoryById').and.returnValue(Promise.resolve());
    const spy2 = spyOn(categoryService, 'findAllCategories').and.callFake((params: any): any => {
      if (params.hasOwnProperty('order')) {
        return Promise.resolve([{ id: 2, name: 'Category B' }]);
      } else {
        return Promise.resolve({
          page: 0, size: 10, totalPages: 1, content: [{ id: 2, name: 'Category B' }]
        });
      }
    });

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith({ page: 0, size: 10, sort: ['id,asc'] });
    });

    component.deleteCategoryById(1);
  }));

});
