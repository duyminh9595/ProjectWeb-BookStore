import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInHomepage } from 'src/app/model/book-in-homepage';
import { ProductDetailService } from './service/product-detail.service';
import es from '@angular/common/locales/es';
import { AddToCartService } from 'src/app/service/add-to-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: BookInHomepage = new BookInHomepage();
  checkExists: boolean = true;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productDetailSer: ProductDetailService,
    private addToCartSer: AddToCartService
  ) {}

  ngOnInit(): void {
    registerLocaleData(es);
    this.activeRoute.paramMap.subscribe(() => this.getProductById());
  }
  getProductById() {
    let checkBookId = this.activeRoute.snapshot.paramMap.has('id');
    if (checkBookId) {
      let bookId = +this.activeRoute.snapshot.paramMap.get('id')!;
      this.productDetailSer.getProductById(bookId).subscribe({
        next: (res: any) => {
          this.product = res;
        },
        error: (err) => {
          this.checkExists = false;
        },
      });
    } else {
      this.router.navigateByUrl('/books');
    }
  }
  getData() {
    return (data: any) => {
      this.product = data;
    };
  }
  addBookToCart(data: BookInHomepage) {
    this.addToCartSer.addItemToCart(data);
  }
}
