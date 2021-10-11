import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateInfoDto } from 'src/app/model/update-info-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InfoAccountService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIInfoAccount = this.APIEndPoint + 'user';
  constructor(private httpClient: HttpClient) {}
  getInfoAccount(): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    return this.httpClient
      .get<any>(this.APIInfoAccount, {
        headers: yourHeader,
      })
      .pipe();
  }
  updateInfoAccount(data: UpdateInfoDto): Observable<any> {
    const APIUpDateAccount = this.APIInfoAccount + '/update';
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    return this.httpClient
      .put<any>(APIUpDateAccount, data, {
        headers: yourHeader,
      })
      .pipe();
  }
}
