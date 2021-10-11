import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetArticleAccountService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIAddToCart = this.APIEndPoint + 'article/account';
  constructor(private httpClient: HttpClient) {}
  getArticleByAccount(): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.get<any>(this.APIAddToCart, {
      headers: yourHeader,
    });
  }
  delArticleByAccount(blogId: number): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.delete<any>(this.APIAddToCart + '/' + blogId, {
      headers: yourHeader,
    });
  }
}
