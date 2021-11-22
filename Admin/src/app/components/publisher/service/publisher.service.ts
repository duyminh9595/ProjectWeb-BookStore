import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publisher } from 'src/app/model/publisher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APITypes =
    this.APIEndPoint + 'publisher';
  constructor(private httpClient: HttpClient) { }
  getPublisher(){
    const url=this.APITypes +'?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponseType>(url).pipe();
  }
}
interface GetResponseType {
  publisher: Publisher[];
}
