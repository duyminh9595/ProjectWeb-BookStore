import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDto } from 'src/app/model/user-login-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoLoginService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APILogin = this.APIEndPoint + 'user/login';
  constructor(private httpClient: HttpClient) {}
  doLogin(data: UserLoginDto): Observable<any> {
    // const requestOptions: Object = {
    //   /* other options here */
    //   responseType: 'text'
    // }
    console.log(data);
    return this.httpClient.post<any>(this.APILogin, data);
  }
}
