import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CouponCreate } from 'src/app/models/coupon-create';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddMaGiamgiaService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  addCoupon(data: CouponCreate) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    console.log(data)
    return this.httpClient.post<any>(this.APIEndPoint + "coupon", data, {
      headers: yourHeader,
    });
  }
}
