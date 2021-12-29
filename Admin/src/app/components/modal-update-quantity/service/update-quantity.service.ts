import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Soluongdto } from 'src/app/models/soluongdto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateQuantityService {
  readonly APIEndPoint = environment.APIEndpoint;
  constructor(private httpClient: HttpClient) { }
  updatesach(data: Soluongdto, id: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    console.log(data)
    return this.httpClient.post<any>(this.APIEndPoint + "book/updatesl?id=" + id, data, {
      headers: yourHeader,
    });
  }
}
