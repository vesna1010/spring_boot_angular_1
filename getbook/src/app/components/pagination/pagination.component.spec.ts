import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';
import { Router } from '@angular/router';

describe('PaginationComponentTest', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;
  let debugElement: DebugElement;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PaginationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should create numbers = [1, 2, 3]', () => {
    component.page = { number: 2, size: 10, totalPages: 3, content: [{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }] };

    component.ngOnChanges();

    expect(component.numbers).toEqual([0, 1, 2]);
  });

  it('should display pagination', () => {
    component.page = { number: 2, size: 10, totalPages: 3, content: [{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }] };
    component.numbers = [0, 1, 2];

    fixture.detectChanges();

    const aElements: HTMLAnchorElement[] = debugElement.queryAll(By.css('a')).map((li) => li.nativeElement);

    expect(aElements.length).toEqual(5);

    expect(aElements[0].textContent).toEqual('Previous');
    expect(aElements[1].textContent).toEqual('1');
    expect(aElements[2].textContent).toEqual('2');
    expect(aElements[3].textContent).toEqual('3');
    expect(aElements[4].textContent).toEqual('Next');

    expect(aElements[3].parentElement.classList).toContain('active');
    expect(aElements[4].parentElement.classList).toContain('disabled');
  });

  it('should redirect page', () => {
    component.pageUrl = '/myUrl';
    component.page = { number: 2, size: 10, totalPages: 3, content: [{ id: 1, name: 'Category A' }, { id: 2, name: 'Category B' }] };
    component.params = { page: 2, size: 10, sort: ['id,asc'] };

    const spy = spyOn(router, 'navigate');

    component.navigateToPageNumber(1);

    expect(spy).toHaveBeenCalledWith(['/myUrl'], { queryParams: { page: 1, size: 10, sort: ['id,asc'] } });
  });

});
