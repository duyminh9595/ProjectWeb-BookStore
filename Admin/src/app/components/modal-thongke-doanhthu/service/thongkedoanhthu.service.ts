import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StartEndDate } from 'src/app/models/start-end-date';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThongkedoanhthuService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  thongkedoanhthu(data: StartEndDate) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.post<any>(this.APIEndPoint + "user/thongkedoanhthu", data, {
      headers: yourHeader,
    });
  }
}
