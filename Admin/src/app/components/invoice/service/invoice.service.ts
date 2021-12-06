import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartOnAdmin } from 'src/app/model/cart-on-admin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  getAllCart() {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<GetResponse>(this.APIEndPoint + "cart/getallcartadmin", {
      headers: yourHeader,
    });
  }
  apporve(id: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.post<GetResponse>(this.APIEndPoint + "cart/approve/" + id, null, {
      headers: yourHeader,
    });
  }
}
interface GetResponse {
  response: CartOnAdmin[];
}
