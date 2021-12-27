import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceBaseonCouponService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  getAllCartBaseOnCoupon(id: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<any>(this.APIEndPoint + "cart/getcartbaseoncoupon?coupon=" + id, {
      headers: yourHeader,
    });
  }
  getAllCartBaseOnCouponAndCartId(id: number, cartid: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<any>(this.APIEndPoint + "cart/getcartbaseoncouponandcartid?coupon=" + id + "&cartid=" + cartid, {
      headers: yourHeader,
    });
  }
}
