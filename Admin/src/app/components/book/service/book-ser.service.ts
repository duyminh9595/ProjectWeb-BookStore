import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBook } from 'src/app/model/add-book';
import { BookInfor } from 'src/app/model/book-infor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookSerService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APICreateBook = this.APIEndPoint + 'book';
  constructor(private httpClient: HttpClient) { }
  doPostBook(data: AddBook): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    console.log(localStorage.getItem('tokenLogin'));
    return this.httpClient.post<any>(this.APICreateBook, data, {
      headers: yourHeader,
    });
  }
  getAllBook(): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.get<GetResponseProduct>(this.APICreateBook + "/homepage?page=1&recordsPerPage=999", {
      headers: yourHeader,
    }).pipe();
  }
  uploadImageBook(formData: FormData, bookId: number): Observable<any> {
    const API = this.APICreateBook + "/image/" + bookId;
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`
    });
    console.log(formData);
    return this.httpClient.post(API,
      formData,
      {
        headers: yourHeader,
      }
    );
  }
}
interface GetResponseProduct {
  book: BookInfor[];
}
