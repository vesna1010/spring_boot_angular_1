import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IBook } from 'src/app/models/i-book';
import { ICategory } from 'src/app/models/i-category';
import { IAuthor } from 'src/app/models/i-author';
import { Language } from 'src/app/enums/language.enum';
import { CategoryService } from 'src/app/services/category.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  static fileReader: FileReader = new FileReader();

  Object = Object;
  Language = Language;

  categories: ICategory[];
  authors: IAuthor[];

  @Input() book: IBook;
  @Output() save: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private categoryService: CategoryService,
    private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.categoryService.findAllCategories({ order: ['name,asc'] }).then(
      (data: ICategory[]) => {
        this.categories = data;
      });

    this.authorService.findAllAuthors({ order: ['name,asc', 'id,asc'] }).then(
      (data: IAuthor[]) => {
        this.authors = data;
      });
  }

  isEqualCategories(category1: ICategory, category2: ICategory): boolean {
    return (category1 && category2 && category1.id === category2.id);
  }

  isEqualAuthors(author1: IAuthor, author2: IAuthor): boolean {
    return (author1 && author2 && author1.id === author2.id);
  }

  setBookContent(file: File) {
    this.book.content = null;

    BookFormComponent.fileReader.readAsArrayBuffer(file);

    BookFormComponent.fileReader.onload = () => {
      const arrayBuffer = BookFormComponent.fileReader.result as ArrayBuffer;
      const uint8 = new Uint8Array(arrayBuffer);
      const result: number[] = [];

      for (let i = 0; i < uint8.length; i++) {
        result.push(uint8[i]);
      }

      this.book.content = result;
    };

  }

  onSubmit() {
    this.save.emit();
  }

}
