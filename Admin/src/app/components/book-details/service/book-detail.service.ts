import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookDetailService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIProduct = this.APIEndPoint + 'book/';
  constructor(private httpClient: HttpClient) { }
  getProductById(id: number) {
    return this.httpClient.get<any>(this.APIProduct + id).pipe();
  }
}
