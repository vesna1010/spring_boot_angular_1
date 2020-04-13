import { Component, Input } from '@angular/core';
import { IBook } from 'src/app/models/i-book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})
export class DisplayBookComponent {
  @Input() book: IBook;

  constructor(private bookService: BookService) { }

  downloadBook() {
    this.bookService.findBookContentById(this.book.id).then((data: ArrayBuffer) => {
      const file: Blob = new Blob([data], { type: 'application/pdf' });

      this.saveFileAs(file);
    });
  }

  private saveFileAs(file: Blob) {
    const a = document.createElement('a');

    a.href = URL.createObjectURL(file);
    a.download = this.book.title;
    a.click();
  }

}