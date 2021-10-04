import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegisterDTO } from 'src/app/class/user-register-dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APISignUp = this.APIEndPoint + 'user/signup';
  constructor(private httpClient: HttpClient) {}
  doSignUp(data: UserRegisterDTO): Observable<any> {
    console.log(data);
    return this.httpClient.post<any>(this.APISignUp, data);
  }
}
