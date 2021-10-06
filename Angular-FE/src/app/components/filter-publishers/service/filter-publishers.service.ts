import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumberBookByPublisher } from 'src/app/model/number-book-by-publisher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterPublishersService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APINumberBookByPublisher = this.APIEndPoint + 'publisher/numberbook';
  constructor(private httpClient: HttpClient) {}
  getNumberProductsByType() {
    return this.httpClient
      .get<GetResponseProductByPublisher>(this.APINumberBookByPublisher)
      .pipe();
  }
}
interface GetResponseProductByPublisher {
  numberBookByPublisher: NumberBookByPublisher[];
}
