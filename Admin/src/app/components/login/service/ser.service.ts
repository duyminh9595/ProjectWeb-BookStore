import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adminlogin } from 'src/app/model/adminlogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APILogin = this.APIEndPoint + 'admin/login';
  constructor(private httpClient: HttpClient) { }
  doLogin(data:Adminlogin): Observable<any> {
    // const requestOptions: Object = {
    //   /* other options here */
    //   responseType: 'text'
    // }
    console.log(data);
    return this.httpClient.post<any>(this.APILogin, data);
  }
}
