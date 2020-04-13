import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CreateCategoryComponent } from './create-category.component';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';

describe('CreateCategoryComponentTest', () => {
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let component: CreateCategoryComponent;
  let debugElement: DebugElement;
  let categoryService: CategoryService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [CreateCategoryComponent, CategoryFormComponent],
      providers: [CategoryService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    categoryService = TestBed.get(CategoryService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show form element', () => {
    expect(debugElement.queryAll(By.css('app-category-form')).length).toEqual(1);
  });

  it('should save category', async(() => {
    component.category = { id: null, name: 'Category' };

    const spy1 = spyOn(categoryService, 'saveCategory').and.returnValue(Promise.resolve({ id: 1, name: 'Category' }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith({ id: null, name: 'Category' });
      expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Saved');
      expect(spy3).toHaveBeenCalledWith('/categories/form/1');
    });

    component.saveCategory();
  }));

});

