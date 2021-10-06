import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookInHomepage } from 'src/app/model/book-in-homepage';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { LoadBookInHomePageService } from '../homepage/service/load-book-in-home-page.service';

@Component({
  selector: 'app-feature-product',
  templateUrl: './feature-product.component.html',
  styleUrls: ['./feature-product.component.css'],
})
export class FeatureProductComponent implements OnInit {
  products: BookInHomepage[] = [];
  constructor(
    private loadBookInHomePage: LoadBookInHomePageService,
    private activeRoute: ActivatedRoute,
    private addBookToCartSer: AddToCartService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => this.listProducts());
  }
  listProducts() {
    this.loadBookInHomePage.getProductsInHomePage().subscribe(this.getDatas());
  }
  getDatas() {
    return (data: any) => {
      this.products = data;
    };
  }
  addBookToCart(data: BookInHomepage) {
    this.addBookToCartSer.addItemToCart(data);
  }
}
