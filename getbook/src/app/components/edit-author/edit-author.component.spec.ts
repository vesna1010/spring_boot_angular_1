import { EditAuthorComponent } from './edit-author.component';
import { DebugElement } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AuthorFormComponent } from '../author-form/author-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

describe('EditAuthorComponentTest', () => {
  let fixture: ComponentFixture<EditAuthorComponent>;
  let component: EditAuthorComponent;
  let debugElement: DebugElement;
  let authorService: AuthorService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [EditAuthorComponent, AuthorFormComponent],
      providers: [AuthorService, {
        provide: ActivatedRoute, useValue: {
          snapshot: { params: { id: 1 } }
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuthorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authorService = TestBed.get(AuthorService);
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
    component.author = { id: 1, name: 'Author', email: 'author@gmail.com', description: 'Description' };

    fixture.detectChanges();

    expect(debugElement.queryAll(By.css('app-author-form')).length).toEqual(1);
  });

  it('should return author by id', async(() => {
    const spy = spyOn(authorService, 'findAuthorById').and.returnValue(
      Promise.resolve({ id: 1, name: 'Author', email: 'author@gmail.com', description: 'Description' }));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(1);
      expect(component.author.id).toEqual(1);
      expect(component.author.name).toEqual('Author');
      expect(component.author.email).toEqual('author@gmail.com');
      expect(component.author.description).toEqual('Description');
    });

    component.ngOnInit();
  }));

  it('should show error message', async(() => {
    const spy1 = spyOn(authorService, 'findAuthorById').and.returnValue(
      Promise.reject({ error: { message: 'No author with id 1' } }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith('No author with id 1');
      expect(spy3).toHaveBeenCalledWith('/authors/form');
    });

    component.ngOnInit();
  }));

  it('should update author', async(() => {
    component.author = { id: 1, name: 'Author' };

    const spy1 = spyOn(authorService, 'updateAuthor').and.returnValue(Promise.resolve({ id: 1, name: 'Author' }));
    const spy2 = spyOn(window, 'alert');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith({ id: 1, name: 'Author' });
      expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Updated');
      expect(component.author).toEqual({ id: 1, name: 'Author' });
    });

    component.updateAuthor();
  }));

});

