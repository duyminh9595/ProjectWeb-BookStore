import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIRatingStar = this.APIEndPoint + 'rating';
  constructor(private httpClient: HttpClient) {}
  getAllCommantAndRatingOfBookId(bookId: number): Observable<any> {
    return this.httpClient.get<any>(this.APIRatingStar + '/' + bookId).pipe();
  }
}
