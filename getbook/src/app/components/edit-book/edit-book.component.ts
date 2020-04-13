import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { IBook } from 'src/app/models/i-book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book: IBook;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id: number = + this.activatedRoute.snapshot.params.id;

    this.bookService.findBookById(id).then(
      (data: IBook) => {
        this.book = data;
      }).catch((reason: any) => {
        alert(reason.error.message);
        this.router.navigateByUrl('/books/form');
      });
  }

  updateBook() {
    this.bookService.updateBook(this.book).then(
      (data: IBook) => {
        alert('Your Data Has Been Successfully Updated');
        this.book = data;
      });
  }

}

