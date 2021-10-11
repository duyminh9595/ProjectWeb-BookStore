import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdatePassword } from 'src/app/model/update-password';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoUpdateService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIUpdatePassword = this.APIEndPoint + 'user/updatepassword';
  constructor(private httpClient: HttpClient) {}
  doUpdate(data: UpdatePassword) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    return this.httpClient.post<any>(this.APIUpdatePassword, data, {
      headers: yourHeader,
    });
  }
}
