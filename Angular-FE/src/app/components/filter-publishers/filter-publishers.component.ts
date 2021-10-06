import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NumberBookByPublisher } from 'src/app/model/number-book-by-publisher';
import { FilterPublishersService } from './service/filter-publishers.service';

@Component({
  selector: 'app-filter-publishers',
  templateUrl: './filter-publishers.component.html',
  styleUrls: ['./filter-publishers.component.css'],
})
export class FilterPublishersComponent implements OnInit {
  numbeProduct: NumberBookByPublisher[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private numberProductByPublisher: FilterPublishersService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.loadNumberPoducts());
  }
  loadNumberPoducts() {
    this.numberProductByPublisher
      .getNumberProductsByType()
      .subscribe(this.getDatas());
  }
  getDatas() {
    return (data: any) => {
      this.numbeProduct = data;
    };
  }
}
