import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddType } from 'src/app/model/add-type';
import { BookInfor } from 'src/app/model/book-infor';
import { CatBook } from 'src/app/model/cat-book';
import { Publisher } from 'src/app/model/publisher';
import { Type } from 'src/app/model/type';
import { NameDto } from 'src/app/models/name-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APITypes =
    this.APIEndPoint + 'type';
  constructor(private httpClient: HttpClient) { }
  getType() {
    const url = this.APITypes + '?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponseType>(url).pipe();
  }
  getTypeBook() {
    const url = this.APITypes + '/numberbook?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponse>(url).pipe();
  }
  getTypeBookBaseTypeid(id: number) {
    const url = this.APIEndPoint + 'book/type/' + id + '?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponseBook>(url).pipe();
  }
  addType(data: AddType) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.post<any>(this.APITypes, data, {
      headers: yourHeader,
    });
  }
  searchbynametheloai(data: NameDto) {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.post<any>(this.APIEndPoint + 'type/findname', data, {
      headers: yourHeader,
    });
  }
}
interface GetResponseType {
  publisher: Type[];
}
interface GetResponse {
  type: CatBook[];
}
interface GetResponseBook {
  response: BookInfor[];
}

