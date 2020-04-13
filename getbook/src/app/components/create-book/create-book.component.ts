import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { IBook } from 'src/app/models/i-book';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent {
  book: IBook;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
    this.book = {
      id: null, title: null, isbn: null, language: null, category: null, authors: null, content: null
    };
  }

  saveBook() {
    this.bookService.saveBook(this.book).then(
      (data: IBook) => {
        alert('Your Data Has Been Successfully Saved');
        this.router.navigateByUrl('/books/form/' + data.id);
      });
  }

}

