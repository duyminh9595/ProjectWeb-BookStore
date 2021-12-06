import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPublisher } from 'src/app/model/add-publisher';
import { BookInfor } from 'src/app/model/book-infor';
import { Publisher } from 'src/app/model/publisher';
import { PublisherBook } from 'src/app/model/publisher-book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APITypes =
    this.APIEndPoint + 'publisher';
  constructor(private httpClient: HttpClient) { }
  getPublisher() {
    const url = this.APITypes + '?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponseType>(url).pipe();
  }
  getPublisherBook() {
    const url = this.APITypes + '/numberbook?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponse>(url).pipe();
  }
  getPublisherBookBaseonPublisherId(id: number) {
    const url = this.APIEndPoint + 'book/publisher/' + id + '?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponseBook>(url).pipe();
  }
  addPublisher(data: AddPublisher) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.post<any>(this.APITypes, data, {
      headers: yourHeader,
    });
  }
}
interface GetResponseType {
  publisher: Publisher[];
}
interface GetResponse {
  publisher: PublisherBook[];
}
interface GetResponseBook {
  response: BookInfor[];
}
