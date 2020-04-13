import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAuthor } from 'src/app/models/i-author';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent {
  @Input() author: IAuthor;
  @Output() save: EventEmitter<null> = new EventEmitter<null>();

  onSubmit() {
    this.save.emit();
  }

}

