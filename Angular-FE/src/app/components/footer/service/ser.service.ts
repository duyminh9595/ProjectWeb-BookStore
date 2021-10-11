import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SerFooterService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APINumberBookByType =
    this.APIEndPoint + 'article?recordsPerPage=3&page=1';
  constructor(private httpClient: HttpClient) {}
  get3BlogInFooter(): Observable<any> {
    return this.httpClient.get<any>(this.APINumberBookByType).pipe();
  }
}
