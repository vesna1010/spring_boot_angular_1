import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthorFormComponent } from './author-form.component';

describe('AuthorFormComponentTest', () => {
  let fixture: ComponentFixture<AuthorFormComponent>;
  let component: AuthorFormComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AuthorFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show the completed form', () => {
    component.author = { id: 1, name: 'Author', email: 'author@gmail.com', description: 'Description' };

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(debugElement.query(By.css('#id')).nativeElement.value).toEqual('1');
      expect(debugElement.query(By.css('#name')).nativeElement.value).toEqual('Author');
      expect(debugElement.query(By.css('#email')).nativeElement.value).toEqual('author@gmail.com');
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
