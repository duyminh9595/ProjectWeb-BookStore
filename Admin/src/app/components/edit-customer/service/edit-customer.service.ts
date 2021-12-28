import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgaysinhGender } from 'src/app/models/ngaysinh-gender';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditCustomerService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  getInfo(id: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<any>(this.APIEndPoint + "user/infoadmin?id=" + id, {
      headers: yourHeader,
    });
  }
  updateInfo(id: number, data: NgaysinhGender) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.post<any>(this.APIEndPoint + "user/updateadmin?id=" + id, data, {
      headers: yourHeader,
    });
  }
}
