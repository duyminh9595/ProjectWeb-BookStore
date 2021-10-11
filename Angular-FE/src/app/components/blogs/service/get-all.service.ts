import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIGetBlogs = this.APIEndPoint + 'article';
  constructor(private httpClient: HttpClient) {}
  getBlogs(): Observable<any> {
    return this.httpClient.get<any>(this.APIGetBlogs).pipe();
  }
}
