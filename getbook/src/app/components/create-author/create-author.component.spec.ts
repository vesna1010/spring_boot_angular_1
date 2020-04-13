import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CreateAuthorComponent } from './create-author.component';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorFormComponent } from '../author-form/author-form.component';

describe('CreateAuthorComponentTest', () => {
  let fixture: ComponentFixture<CreateAuthorComponent>;
  let component: CreateAuthorComponent;
  let debugElement: DebugElement;
  let authorService: AuthorService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [CreateAuthorComponent, AuthorFormComponent],
      providers: [AuthorService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAuthorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authorService = TestBed.get(AuthorService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show form element', () => {
    expect(debugElement.queryAll(By.css('app-author-form')).length).toEqual(1);
  });

  it('should save author', async(() => {
    component.author = { id: null, name: 'Author' };

    const spy1 = spyOn(authorService, 'saveAuthor').and.returnValue(Promise.resolve({ id: 1, name: 'Author' }));
    const spy2 = spyOn(window, 'alert');
    const spy3 = spyOn(router, 'navigateByUrl');

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(spy1).toHaveBeenCalledWith({ id: null, name: 'Author' });
      expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Saved');
      expect(spy3).toHaveBeenCalledWith('/authors/form/1');
    });

    component.saveAuthor();
  }));

});
