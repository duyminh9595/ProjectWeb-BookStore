import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publisher } from 'src/app/model/publisher';
import { Type } from 'src/app/model/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APITypes =
    this.APIEndPoint + 'type';
  constructor(private httpClient: HttpClient) { }
  getType(){
    const url=this.APITypes +'?page=1&recordsPerPage=99';
    return this.httpClient.get<GetResponseType>(url).pipe();
  }
}
interface GetResponseType {
  publisher: Type[];
}
