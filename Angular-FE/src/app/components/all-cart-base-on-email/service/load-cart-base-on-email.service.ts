import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadCartBaseOnEmailService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APICartBaseOnEmail = this.APIEndPoint + 'cart';
  constructor(private httpClient: HttpClient) {}
  getCartsBaseOnEmail() {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient
      .get<any>(this.APICartBaseOnEmail, {
        headers: yourHeader,
      })
      .pipe();
  }
}
