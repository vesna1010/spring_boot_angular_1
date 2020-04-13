import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/i-category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  category: ICategory;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.category = { id: null, name: null, description: null };
  }

  saveCategory() {
    this.categoryService.saveCategory(this.category).then(
      (data: ICategory) => {
        alert('Your Data Has Been Successfully Saved');
        this.router.navigateByUrl('/categories/form/' + data.id);
      });
  }

}