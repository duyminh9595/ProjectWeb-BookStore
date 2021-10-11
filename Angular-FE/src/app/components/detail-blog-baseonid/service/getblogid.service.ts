import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetblogidService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIGetBlogs = this.APIEndPoint + 'article';
  constructor(private httpClient: HttpClient) {}
  getBlogs(blogId: number): Observable<any> {
    return this.httpClient.get<any>(this.APIGetBlogs + '/' + blogId).pipe();
  }
}
