import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  getAllBlog() {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<any>(this.APIEndPoint + "article/all-article?page=1&size=6", {
      headers: yourHeader,
    });
  }
  getAllTrongThang() {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<any>(this.APIEndPoint + "user/top5trongthang", {
      headers: yourHeader,
    });
  }
  getAllBookTrongThang() {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    return this.httpClient.get<any>(this.APIEndPoint + "publisher/sltrongthang", {
      headers: yourHeader,
    });
  }
}
