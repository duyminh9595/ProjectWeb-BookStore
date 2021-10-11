import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FacebookLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { ExternalAuthDto } from 'src/app/model/external-auth-dto';
import { UserLoginDto } from 'src/app/model/user-login-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoLoginService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APILogin = this.APIEndPoint + 'user/login';
  constructor(
    private httpClient: HttpClient,
    private _externalAuthService: SocialAuthService
  ) {}
  doLogin(data: UserLoginDto): Observable<any> {
    // const requestOptions: Object = {
    //   /* other options here */
    //   responseType: 'text'
    // }
    console.log(data);
    return this.httpClient.post<any>(this.APILogin, data);
  }

  public signInWithGoogle = () => {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  };
  public signInWithFacebook = () => {
    return this._externalAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  };
  public sendGoogleAccount(data: ExternalAuthDto): Observable<any> {
    const url = this.APIEndPoint + 'external/externallogingoogle';
    return this.httpClient.post<any>(url, data).pipe();
  }
  public sendFacebook(data: any): Observable<any> {
    const url = this.APIEndPoint + 'external/externalloginfacebook';
    return this.httpClient.post<any>(url, data).pipe();
  }
}
