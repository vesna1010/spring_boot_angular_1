import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { BooksPageComponent } from './components/books-page/books-page.component';
import { AuthorsPageComponent } from './components/authors-page/authors-page.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { EditAuthorComponent } from './components/edit-author/edit-author.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { DisplayBookComponent } from './components/display-book/display-book.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CategoryFormComponent,
    AuthorFormComponent,
    BookFormComponent,
    CategoriesPageComponent,
    BooksPageComponent,
    AuthorsPageComponent,
    PaginationComponent,
    CreateCategoryComponent,
    CreateAuthorComponent,
    CreateBookComponent,
    EditAuthorComponent,
    EditCategoryComponent,
    EditBookComponent,
    DisplayBookComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
