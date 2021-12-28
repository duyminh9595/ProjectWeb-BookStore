import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommendOnBook } from 'src/app/model/commend-on-book';
import { ImageTruyen } from 'src/app/models/image-truyen';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookDetailService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIInvoiceBelongBook = this.APIEndPoint + 'book/';
  constructor(private httpClient: HttpClient) { }
  getProductById(id: number) {
    return this.httpClient.get<any>(this.APIInvoiceBelongBook + id).pipe();
  }
  getCartDetail(bookid: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.get<any>(this.APIEndPoint + "cart/bookbaseoncart/" + bookid, {
      headers: yourHeader,
    });
  }
  getAllCommendBelongBook(bookid: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.get<any>(this.APIEndPoint + "cart/getallcommendbookidadmin/" + bookid, {
      headers: yourHeader,
    });
  }
  updateImage(bookid: number, data: ImageTruyen) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.post<any>(this.APIEndPoint + "book/adminupdateimage?id=" + bookid, data, {
      headers: yourHeader,
    });
  }
  doHideShowCommend(data: CommendOnBook, bookid: number) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.post<any>(this.APIEndPoint + "cart/getallcommendbookidadmin/" + bookid + "/userid/" + data.userInfoId, null, {
      headers: yourHeader,
    });
  }
}
