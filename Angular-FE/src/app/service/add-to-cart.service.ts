import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BookInHomepage } from '../model/book-in-homepage';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  totalBookByIdInCart: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = localStorage;
  carts: CartItem[] = [];
  constructor(private httpClient: HttpClient) {
    let data = JSON.parse(this.storage.getItem('cartItems')!);
    if (data != null) {
      this.carts = data;
      this.computeData();
    }
  }
  addItemToCart(data: BookInHomepage) {
    let existingCartItem: CartItem = undefined!;
    let checkCartItem: boolean = false;
    if (this.carts.length > 0) {
      existingCartItem = this.carts.find((item) => item.book.id == data.id)!;
      checkCartItem = existingCartItem != undefined;
    }
    if (checkCartItem) {
      existingCartItem.quantity++;
    } else {
      existingCartItem = new CartItem();
      existingCartItem.book = data;
      existingCartItem.id = data.id;
      existingCartItem.name = data.name;
      existingCartItem.shortreview = data.shortReview;
      existingCartItem.urlbookimageshow = data.urlBookImageShow;
      existingCartItem.quantity = 1;
      existingCartItem.price = data.price;
      existingCartItem.priceTotal = data.price * existingCartItem.quantity;
      this.carts.push(existingCartItem);
    }
    this.storage.setItem('cartItems', JSON.stringify(this.carts));
    this.computeData();
  }
  minusCartItem(data: BookInHomepage) {
    let cartItem: CartItem = this.carts.find(
      (item) => item.id == data.id
    )!;
    cartItem.quantity--;
    if (cartItem.quantity == 0) {
      this.removeCartItem(cartItem.book);
    }
    this.computeData();
  }
  addNumberCartItem(data: BookInHomepage, quantity: number) {
    let cartItem: CartItem = this.carts.find(
      (item) => item.id == data.id
    )!;
    cartItem.quantityInCart = quantity;
    if (cartItem.quantityInCart == 0) {
      this.removeCartItem(cartItem.book);
    }
    this.computeData();
  }
  removeCartItem(data: BookInHomepage) {
    const position = this.carts.findIndex((x) => x.id == data.id);
    if (position > -1) {
      this.carts.splice(position, 1);
      this.computeData();
    }
  }
  removeAllItem() {
    this.carts.splice(0, this.carts.length);
    this.computeData();
  }
  computeData() {
    let price: number = 0;
    let quantity: number = 0;
    for (let item of this.carts) {
      quantity += item.quantity;
      price += item.book.price * item.quantity;
    }
    this.totalPrice.next(price);
    this.totalQuantity.next(quantity);
    this.totalBookByIdInCart.next(this.carts.length);
    this.storage.setItem('cartItems', JSON.stringify(this.carts));
  }
}
