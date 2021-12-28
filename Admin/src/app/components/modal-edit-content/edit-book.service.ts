import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publisher } from 'src/app/model/publisher';
import { UpdateSachDto } from 'src/app/models/update-sach-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditBookService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIInvoiceBelongBook = this.APIEndPoint + 'book/';
  private APIType =
    this.APIEndPoint + 'type';
  private APITypes =
    this.APIEndPoint + 'publisher';
  constructor(private httpClient: HttpClient) { }
  getProductById(id: number) {
    return this.httpClient.get<any>(this.APIInvoiceBelongBook + id).pipe();
  }
  getPublisher() {
    const url = this.APITypes + '?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponseType>(url).pipe();
  }
  getType() {
    const url = this.APIType + '?page=1&recordsPerPage=99';
    return this.httpClient.get<any>(url).pipe();
  }
  updatesach(data: UpdateSachDto, id: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`
    });
    console.log(data)
    return this.httpClient.post<any>(this.APIEndPoint + "book/update?id=" + id, data, {
      headers: yourHeader,
    });
  }
}
interface GetResponseType {
  publisher: Publisher[];
}
