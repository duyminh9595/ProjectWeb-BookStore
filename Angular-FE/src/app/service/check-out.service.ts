import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubmitFormCart } from '../model/submit-form-cart';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIAddToCart = this.APIEndPoint + 'cart';
  constructor(private httpClient: HttpClient) { }
  getProvince(): Observable<any> {
    const url = 'https://provinces.open-api.vn/api/';
    return this.httpClient.get<any>(url).pipe();
  }
  getDisinct(): Observable<any> {
    const url = 'https://provinces.open-api.vn/api/d/';
    return this.httpClient.get<any>(url).pipe();
  }
  getWard(): Observable<any> {
    const url = 'https://provinces.open-api.vn/api/w/';
    return this.httpClient.get<any>(url).pipe();
  }
  doCheckOut(data: SubmitFormCart): Observable<any> {
    console.log(data);
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    return this.httpClient.post<any>(this.APIAddToCart, data, {
      headers: yourHeader,
    });
  }
}
