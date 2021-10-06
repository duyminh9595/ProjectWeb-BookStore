import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInHomepage } from 'src/app/model/book-in-homepage';
import { LoadProductService } from './service/load-product.service';
import es from '@angular/common/locales/es';
import { AddToCartService } from 'src/app/service/add-to-cart.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products: BookInHomepage[] = [];
  pageNumber: number = 1;
  maxPage: number = 0;
  atMaxPage!: false;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private loadProduct: LoadProductService,
    private addBookToCartSer: AddToCartService
  ) {}
  page: number = 1;
  ngOnInit(): void {
    registerLocaleData(es);
    this.activeRoute.paramMap.subscribe(() => this.listProducts());
  }
  listProducts() {
    let checkNameSearch = this.activeRoute.snapshot.paramMap.has('keyword');
    let checkTypeId = this.activeRoute.snapshot.paramMap.has('typeId');
    let checkPublisherId =
      this.activeRoute.snapshot.paramMap.has('publisherId');
    if (checkNameSearch) {
      let name = +this.activeRoute.snapshot.paramMap.get('keyword')!;
      this.loadProduct
        .getProductsByTypeId(this.pageNumber * 4, name)
        .subscribe(this.getDatas());
    } else if (checkTypeId) {
      let typeId = +this.activeRoute.snapshot.paramMap.get('typeId')!;
      this.loadProduct
        .getProductsByTypeId(this.pageNumber * 4, typeId)
        .subscribe(this.getDatas());
    } else if (checkPublisherId) {
      let publisherId = +this.activeRoute.snapshot.paramMap.get('publisherId')!;
      this.loadProduct
        .getProductsByPublisherId(this.pageNumber * 4, publisherId)
        .subscribe(this.getDatas());
    } else {
      this.loadProduct
        .getProductsInHomePage(this.pageNumber * 4)
        .subscribe(this.getDatas());
    }
  }

  getDatas() {
    return (data: any) => {
      this.maxPage = data[0].maxPage;
      this.products = data;
      if (data[0].maxPage <= 1 || data[0].maxPage == this.pageNumber) {
        this.maxPage = this.pageNumber;
      }
    };
  }
  loadMore() {
    this.pageNumber += 1;
    this.listProducts();
    let el: HTMLElement;
    el = document.getElementById(
      'label-' + this.products[+((this.pageNumber - 1) * 4 - 1)].id.toString()
    ) as HTMLElement;
    console.log(el);
    el.scrollIntoView({ behavior: 'smooth' });
  }
  addBookToCart(data: BookInHomepage) {
    this.addBookToCartSer.addItemToCart(data);
  }
}
