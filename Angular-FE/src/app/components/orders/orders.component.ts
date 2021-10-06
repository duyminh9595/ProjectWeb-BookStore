import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { AddToCartService } from 'src/app/service/add-to-cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  totalBookByIdInCart!: number;
  totalPrice!: number;
  carts: CartItem[] = [];
  constructor(private addToCartSer: AddToCartService) {}

  ngOnInit(): void {
    this.addToCartSer.totalBookByIdInCart.subscribe((data) => {
      this.totalBookByIdInCart = data;
    });
    this.addToCartSer.totalPrice.subscribe((data) => {
      this.totalPrice = data;
    });
    this.carts = this.addToCartSer.carts;
  }
  minusItem(data: CartItem) {
    this.addToCartSer.minusCartItem(data.book);
  }
  addItem(data: CartItem) {
    this.addToCartSer.addItemToCart(data.book);
  }
  removeItem(data: CartItem) {
    this.addToCartSer.removeCartItem(data.book);
  }
  removeAllItem() {
    this.addToCartSer.removeAllItem();
  }
}
