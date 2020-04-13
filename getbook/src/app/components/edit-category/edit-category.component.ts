import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/i-category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: ICategory;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id: number = + this.activatedRoute.snapshot.params.id;

    this.categoryService.findCategoryById(id).then(
      (data: ICategory) => {
        this.category = data;
      }).catch((reason: any) => {
        alert(reason.error.message);
        this.router.navigateByUrl('/categories/form');
      });
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category).then(
      (data: ICategory) => {
        alert('Your Data Has Been Successfully Updated');
        this.category = data;
      });
  }

}
