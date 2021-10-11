import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadCartBaseOnIdService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APICartItem = this.APIEndPoint + 'cart/';
  constructor(private httpClient: HttpClient) {}
  getCartDetail(cartId: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.get<any>(this.APICartItem + cartId, {
      headers: yourHeader,
    });
  }
}
