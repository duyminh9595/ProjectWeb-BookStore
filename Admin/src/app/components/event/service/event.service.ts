import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  getAllCoupon() {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });

    return this.httpClient.get<any>(this.APIEndPoint + "coupon/list", {
      headers: yourHeader,
    });
  }
  disable(id: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });

    return this.httpClient.post<any>(this.APIEndPoint + "coupon/disable?id=" + id, null, {
      headers: yourHeader,
    });
  }
  enable(id: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });

    return this.httpClient.post<any>(this.APIEndPoint + "coupon/enable?id=" + id, null, {
      headers: yourHeader,
    });
  }
}
