import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SerService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APINumberBookByType = this.APIEndPoint + 'type/numberbook';
  constructor(private httpClient: HttpClient) {}
  getAllCatergories(): Observable<any> {
    return this.httpClient.get<any>(this.APIEndPoint + 'type').pipe();
  }
  getAllPublishers(): Observable<any> {
    return this.httpClient.get<any>(this.APIEndPoint + 'publisher').pipe();
  }
}
