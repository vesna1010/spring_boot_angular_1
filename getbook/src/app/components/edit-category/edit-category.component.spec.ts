import { EditCategoryComponent } from './edit-category.component';
import { DebugElement } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

describe('EditCategoryComponentTest', () => {
  let fixture: ComponentFixture<EditCategoryComponent>;
  let component: EditCategoryComponent;
  let debugElement: DebugElement;
  let categoryService: CategoryService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [EditCategoryComponent, CategoryFormComponent],
      providers: [CategoryService, {
        provide: ActivatedRoute, useValue: {
          snapshot: { params: { id: 1 } }
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    categoryService = TestBed.get(CategoryService);
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
    component.category = { id: 1, name: 'Category', description: 'Description' };

    fixture.detectChanges();

    expect(debugElement.queryAll(By.css('app-category-form')).length).toEqual(1);
  });

  it('should return category by id', async(() => {
    const spy = spyOn(categoryService, 'findCategoryById').and.returnValue(
      Promise.resolve({ id: 1, name: 'Category', description: 'Description' }));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(1);
      expect(component.category.id).toEqual(1);
      expect(component.category.name).toEqual('Category');
      expect(component.category.description).toEqual('Description');
    });

    component.ngOnInit();
  }));

  it('should show error message', async(() => {
    const spy1 = spyOn(categoryService, 'findCategoryById').and.returnValue(
      Promise.reject({ error: { message: 'No category with id 1' } }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith('No category with id 1');
      expect(spy3).toHaveBeenCalledWith('/categories/form');
    });

    component.ngOnInit();
  }));

  it('should update category', async(() => {
    component.category = { id: 1, name: 'Category' };

    const spy1 = spyOn(categoryService, 'updateCategory').and.returnValue(Promise.resolve({ id: 1, name: 'Category' }));
    const spy2 = spyOn(window, 'alert');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith({ id: 1, name: 'Category' });
      expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Updated');
      expect(component.category).toEqual({ id: 1, name: 'Category' });
    });

    component.updateCategory();
  }));

});

