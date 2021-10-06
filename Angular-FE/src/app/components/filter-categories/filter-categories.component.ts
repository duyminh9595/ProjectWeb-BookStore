import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NumberBookByType } from 'src/app/model/number-book-by-type';
import { FilterCategoriesService } from './service/filter-categories.service';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.css'],
})
export class FilterCategoriesComponent implements OnInit {
  numbeProduct: NumberBookByType[] = [];
  constructor(
    private numberProductByType: FilterCategoriesService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.loadNumberPoducts());
  }
  loadNumberPoducts() {
    this.numberProductByType
      .getNumberProductsByType()
      .subscribe(this.getDatas());
  }
  getDatas() {
    return (data: any) => {
      this.numbeProduct = data;
    };
  }
}
