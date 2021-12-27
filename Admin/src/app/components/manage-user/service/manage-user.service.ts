import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/model/user-info';
import { Name } from 'src/app/models/name';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  getAllUser() {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<any>(this.APIEndPoint + "user/seeallaccounts?page=1&recordsPerPage=999", {
      headers: yourHeader,
    });
  }
  getAllUserByName(data: Name) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.post<any>(this.APIEndPoint + "user/findaccountbyname?page=1&recordsPerPage=999", data, {
      headers: yourHeader,
    });
  }
  disableAccount(data: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.post<any>(this.APIEndPoint + "user/disableaccount?id=" + data, null, {
      headers: yourHeader,
    });
  }
}
interface GetResponse {
  response: UserInfo[];
}
