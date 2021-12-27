import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disableenablecommend } from 'src/app/models/disableenablecommend';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanhGiaService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  getAllDanhGiaBinhLuan(id: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<any>(this.APIEndPoint + "rating/user/" + id, {
      headers: yourHeader,
    });
  }
  enabledisable(data: Disableenablecommend) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.post<any>(this.APIEndPoint + "rating/disablecommend", data, {
      headers: yourHeader,
    });
  }
}
