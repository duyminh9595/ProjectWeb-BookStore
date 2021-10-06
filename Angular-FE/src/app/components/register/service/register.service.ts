import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegisterDto } from 'src/app/model/user-register-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APISignUp = this.APIEndPoint + 'user/signup';
  constructor(private httpClient: HttpClient) {}
  doSignUp(data: UserRegisterDto): Observable<any> {
    console.log(data);
    return this.httpClient.post<any>(this.APISignUp, data);
  }
}
