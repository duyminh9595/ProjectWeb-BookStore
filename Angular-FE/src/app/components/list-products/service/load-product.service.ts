import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookInHomepage } from 'src/app/model/book-in-homepage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadProductService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIAllProducts =
    this.APIEndPoint + 'book/homepage?page=1&recordsPerPage=';
  constructor(private httpClient: HttpClient) {}
  getProductsInHomePage(recordPerPage: number) {
    const url = this.APIAllProducts + recordPerPage;
    return this.httpClient.get<GetResponseProduct>(url).pipe();
  }
  getProductsByTypeId(recordPerPage: number, typeId: number) {
    const url =
      this.APIEndPoint +
      'book/type/' +
      typeId +
      '?page=1&recordsPerPage=' +
      recordPerPage;
    return this.httpClient.get<GetResponseProduct>(url).pipe();
  }
  getProductsByPublisherId(recordPerPage: number, publisherId: number) {
    const url =
      this.APIEndPoint +
      'book/publisher/' +
      publisherId +
      '?page=1&recordsPerPage=' +
      recordPerPage;
    console.log(url);
    return this.httpClient.get<GetResponseProduct>(url).pipe();
  }
  getProductsByName(recordPerPage: number, name: string) {
    const url =
      this.APIEndPoint +
      'book/homepage/searchbyname?page=1&recordsPerPage' +
      recordPerPage +
      '&name=' +
      name;
    console.log(url);
    return this.httpClient.get<GetResponseProduct>(url).pipe();
  }
}
interface GetResponseProduct {
  book: BookInHomepage[];
}
