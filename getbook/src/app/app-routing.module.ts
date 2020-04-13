import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';
import { EditAuthorComponent } from './components/edit-author/edit-author.component';
import { AuthorsPageComponent } from './components/authors-page/authors-page.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { BooksPageComponent } from './components/books-page/books-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  {
    path: 'categories', children: [
      { path: '', component: CategoriesPageComponent, data: { title: 'Categories' } },
      { path: 'form', component: CreateCategoryComponent, data: { title: 'Create Category' } },
      { path: 'form/:id', component: EditCategoryComponent, data: { title: 'Edit Category' } }
    ]
  },
  {
    path: 'authors', children: [
      { path: '', component: AuthorsPageComponent, data: { title: 'Authors' } },
      { path: 'form', component: CreateAuthorComponent, data: { title: 'Create Author' } },
      { path: 'form/:id', component: EditAuthorComponent, data: { title: 'Edit Author' } }
    ]
  },
  {
    path: 'books', children: [
      { path: '', component: BooksPageComponent, data: { title: 'Books' } },
      { path: 'form', component: CreateBookComponent, data: { title: 'Create Book' } },
      { path: 'form/:id', component: EditBookComponent, data: { title: 'Edit Book' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

