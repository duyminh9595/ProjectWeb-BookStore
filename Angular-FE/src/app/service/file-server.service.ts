import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileServerService {
  readonly APIEndPoint = environment.APIEndpoint;
  private APIUploadImageAccount = this.APIEndPoint + 'user/imageaccount';
  private APIUploadImageArticle = this.APIEndPoint + 'article/image/article/';
  constructor(private httpClient: HttpClient) {}

  //define upload file

  upload(formData: FormData): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    console.log(formData);
    return this.httpClient.put(this.APIUploadImageAccount, formData, {
      headers: yourHeader,
    });
  }
  uploadImageArticle(formData: FormData, articleId: number): Observable<any> {
    const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${localStorage.getItem('tokenLogin')}`,
    });
    console.log(formData);
    return this.httpClient.post(
      this.APIUploadImageArticle + articleId,
      formData,
      {
        headers: yourHeader,
      }
    );
  }
}
