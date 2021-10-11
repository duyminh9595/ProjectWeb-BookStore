import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookInHomepage } from 'src/app/model/book-in-homepage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoadBookInHomePageService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIAllProducts =
    this.APIEndPoint + 'book/homepage?recordsPerPage=12&page=1';
  constructor(private httpClient: HttpClient) {}
  getProductsInHomePage() {
    console.log(this.APIAllProducts);
    return this.httpClient.get<GetResponseProduct>(this.APIAllProducts).pipe();
  }
}

interface GetResponseProduct {
  book: BookInHomepage[];
}
