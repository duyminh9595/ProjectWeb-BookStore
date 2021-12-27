import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkImage } from 'src/app/models/link-image';
import { NewPass } from 'src/app/models/new-pass';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingAccountService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  uploadImageUser(id: number, data: LinkImage) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.post<any>(this.APIEndPoint + "user/admin/uploadimage?id=" + id, data, {
      headers: yourHeader,
    });
  }
  updatePass(id: number, data: NewPass) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.post<any>(this.APIEndPoint + "user/admin/updatepass?id=" + id, data, {
      headers: yourHeader,
    });
  }
}
