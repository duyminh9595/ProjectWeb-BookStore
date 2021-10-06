import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumberBookByType } from 'src/app/model/number-book-by-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterCategoriesService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APINumberBookByType = this.APIEndPoint + 'type/numberbook';
  constructor(private httpClient: HttpClient) {}
  getNumberProductsByType() {
    return this.httpClient
      .get<GetResponseProductByTpe>(this.APINumberBookByType)
      .pipe();
  }
}
interface GetResponseProductByTpe {
  numberBookByType: NumberBookByType[];
}
