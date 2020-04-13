import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ICategory } from 'src/app/models/i-category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  @Input() category: ICategory;
  @Output() save: EventEmitter<null> = new EventEmitter<null>();

  onSubmit() {
    this.save.emit();
  }

}
