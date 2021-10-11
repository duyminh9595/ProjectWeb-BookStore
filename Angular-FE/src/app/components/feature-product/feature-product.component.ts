import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookInHomepage } from 'src/app/model/book-in-homepage';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { LoadBookInHomePageService } from '../homepage/service/load-book-in-home-page.service';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-feature-product',
  templateUrl: './feature-product.component.html',
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 3rem;
        color: #d3d3d3;
      }
      .full {
        color: red;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: red;
      }
    `,
  ],
})
export class FeatureProductComponent implements OnInit {
  currentRate: number = 0;
  products: BookInHomepage[] = [];
  constructor(
    private loadBookInHomePage: LoadBookInHomePageService,
    private activeRoute: ActivatedRoute,
    private addBookToCartSer: AddToCartService
  ) {}

  ngOnInit(): void {
    registerLocaleData(es);
    this.activeRoute.paramMap.subscribe(() => this.listProducts());
  }
  listProducts() {
    this.loadBookInHomePage.getProductsInHomePage().subscribe(this.getDatas());
  }
  getDatas() {
    return (data: any) => {
      console.log(data);
      this.products = data;
    };
  }
  addBookToCart(data: BookInHomepage) {
    this.addBookToCartSer.addItemToCart(data);
  }
}
