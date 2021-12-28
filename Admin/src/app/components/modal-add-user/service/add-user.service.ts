import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegister } from 'src/app/models/user-register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APISignUp = this.APIEndPoint + 'user/signup';
  constructor(private httpClient: HttpClient) { }
  doSignUp(data: UserRegister): Observable<any> {
    return this.httpClient.post<any>(this.APISignUp, data);
  }
}
