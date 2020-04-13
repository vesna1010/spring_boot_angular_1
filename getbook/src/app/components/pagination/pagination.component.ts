import { Component, Input, OnChanges } from '@angular/core';
import { IPage } from 'src/app/models/i-page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  Object = Object;

  @Input() page: IPage<any>;
  @Input() pageUrl: string;
  @Input() params: { [param: string]: string | number | string[] };

  numbers: number[];

  constructor(
    private router: Router
  ) { }

  ngOnChanges(): void {
    this.numbers = [];

    for (let i = this.page.number - 2; i <= this.page.number + 2; i++) {
      this.numbers.push(i);
    }

    while (this.numbers[this.numbers.length - 1] > this.page.totalPages - 1) {
      this.numbers.pop();
    }

    while (this.numbers[0] < 0) {
      this.numbers.shift();
    }

    while (this.numbers.length < 5 && this.numbers[this.numbers.length - 1] < this.page.totalPages - 1) {
      this.numbers.push(this.numbers[this.numbers.length - 1] + 1);
    }

    while (this.numbers.length < 5 && this.numbers[0] > 0) {
      this.numbers.unshift(this.numbers[0] - 1);
    }
  }

  navigateToPageNumber(page: number) {
    this.router.navigate(
      [this.pageUrl], 
      { queryParams: Object.assign({}, this.params, { page : page, size : this.page.size }) });
  }
}

