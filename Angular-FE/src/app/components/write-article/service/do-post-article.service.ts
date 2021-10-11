import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateArticleDto } from 'src/app/model/create-article-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoPostArticleService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APICreateArticle = this.APIEndPoint + 'article';
  constructor(private httpClient: HttpClient) {}
  doPostArticle(data: CreateArticleDto): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
      Email: `${localStorage.getItem('emailLogin')}`,
    });
    return this.httpClient.post<any>(this.APICreateArticle, data, {
      headers: yourHeader,
    });
  }
}
