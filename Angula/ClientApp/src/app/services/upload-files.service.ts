import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  upload(file: File,product: number=1): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    console.log("url_post_image: ");
    console.log(`${this.baseUrl}/api/Products/upload/${product}`);
    const req = new HttpRequest('POST', `${this.baseUrl}/api/Products/upload/${product}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
