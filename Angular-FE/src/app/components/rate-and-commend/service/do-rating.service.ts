import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingAndCommend } from 'src/app/model/rating-and-commend';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoRatingService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIRatingStar = this.APIEndPoint + 'rating';
  constructor(private httpClient: HttpClient) {}
  doPostRatingStar(data: RatingAndCommend, bookId: number): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    return this.httpClient.post<any>(this.APIRatingStar + '/' + bookId, data, {
      headers: yourHeader,
    });
  }
  doCheckUserHasComment(bookId: number): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    const APICheck = this.APIRatingStar + '/checkrating/' + bookId;
    return this.httpClient.get<any>(APICheck, {
      headers: yourHeader,
    });
  }
  doCheckUserHasBuy(bookId: number): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    const APICheck = this.APIRatingStar + '/checkbuyproduct/' + bookId;
    return this.httpClient.get<any>(APICheck, {
      headers: yourHeader,
    });
  }
}
