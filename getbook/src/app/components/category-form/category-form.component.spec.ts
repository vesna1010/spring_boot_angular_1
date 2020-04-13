import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CategoryFormComponent } from './category-form.component';

describe('CategoryFormComponentTest', () => {
  let fixture: ComponentFixture<CategoryFormComponent>;
  let component: CategoryFormComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CategoryFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show the completed form', () => {
    component.category = { id: 1, name: 'Category', description: 'Description' };

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(debugElement.query(By.css('#id')).nativeElement.value).toEqual('1');
      expect(debugElement.query(By.css('#name')).nativeElement.value).toEqual('Category');
      expect(debugElement.query(By.css('#description')).nativeElement.value).toEqual('Description');
      expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Update');
    });

  });

  it('should emit save event', () => {
    component.save.subscribe((value: any) => {
      expect(value).toBeUndefined();
    });

    component.onSubmit();
  });

});

