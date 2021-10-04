import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginDTO } from 'src/app/class/user-login-dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APILogin = this.APIEndPoint + 'user/login';
  constructor(private httpClient: HttpClient) {}
  doLogin(data: UserLoginDTO): Observable<any> {
    // const requestOptions: Object = {
    //   /* other options here */
    //   responseType: 'text'
    // }
    console.log(data);
    return this.httpClient.post<any>(this.APILogin, data);
  }
}
