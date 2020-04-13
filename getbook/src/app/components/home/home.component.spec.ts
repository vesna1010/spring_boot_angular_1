import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { HomeComponent } from './home.component';
import { DebugElement } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { By } from '@angular/platform-browser';
import { DisplayBookComponent } from '../display-book/display-book.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/app/enums/language.enum';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('HomeComponentTest', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let debugElement: DebugElement;
    let activatedRoute: ActivatedRoute;
    let bookService: BookService;
    let categoryService: CategoryService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
            declarations: [HomeComponent, DisplayBookComponent, PaginationComponent],
            providers: [BookService, CategoryService, {
                provide: ActivatedRoute, useValue: {
                    queryParamMap: of({
                        page: '0',
                        size: '10',
                        sort: 'id,asc',
                        categoryId: '1',

                        get(key: string): string {
                            return this[key];
                        },

                        getAll(key: string): string[] {
                            return [this[key]];
                        }
                    })
                }
            }]
        }).compileComponents;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        activatedRoute = TestBed.get(ActivatedRoute);
        bookService = TestBed.get(BookService);
        categoryService = TestBed.get(CategoryService);
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should show "Loading data. Please wait..."', () => {
        fixture.detectChanges();

        expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('Loading data. Please wait...');
    });

    it('should show books and pagination', () => {
        component.page = {
            content: [{
                id: 1, title: 'Book A', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
                authors: [{ id: 1, name: 'Author' }], content: [], image: []
            },
            {
                id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
                authors: [{ id: 1, name: 'Author' }], content: [], image: []
            }
            ], number: 0, size: 10, totalPages: 1
        };
        component.params = { page: 0, size: 10, sort: ['id,asc'] };

        fixture.detectChanges();

        expect(debugElement.queryAll(By.css('app-display-book')).length).toEqual(2);
        expect(debugElement.queryAll(By.css('nav')).length).toEqual(1);
    });

    it('should return page with books by category id', async(() => {
        const spy1 = spyOn(bookService, 'findAllBooksByCategoryId').and.returnValue(Promise.resolve({
            content: [{
                id: 1, title: 'Book A', isbn: '975-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
                authors: [{ id: 1, name: 'Author' }], content: null
            },
            {
                id: 2, title: 'Book B', isbn: '976-1-4842-3197-5', language: Language.ENGLISH, category: { id: 1, name: 'Category' },
                authors: [{ id: 1, name: 'Author' }], content: null
            }
            ], number: 0, size: 10, totalPages: 1
        }));

        const spy2 = spyOn(categoryService, 'findAllCategories').and.callFake((params: any): any => {
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
            expect(spy1).toHaveBeenCalledWith(1, { page: 0, size: 10, sort: ['id,asc'] });
            expect(spy2).toHaveBeenCalledWith({ order: ['name,asc', 'id,asc'] });

            expect(component.categoryId).toEqual(1);
            expect(component.title).toBeUndefined();
            expect(component.language).toBeUndefined();
            expect(component.categories.length).toEqual(2);
            expect(component.page.content.length).toEqual(2);
            expect(component.params).toEqual({ categoryId: 1, page: 0, size: 10, sort: ['id,asc'] });
        });

        component.ngOnInit();
    }));

});