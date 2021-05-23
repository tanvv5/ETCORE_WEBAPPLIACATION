import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../_models/Response';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product) {
    
  }
  getAll(): Observable<any[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer ".concat(localStorage.getItem('token')))
    return this.http.get<any>(`${environment.ApiUrl}api/Products`, { headers: header });
  }
  get(productId) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token'))),
      params: new HttpParams().set("id", productId)
    };
    return this.http.get<any>(`${environment.ApiUrl}​api/Products`, httpOptions);
  }
  update(productId, product) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token'))),      
      params: new HttpParams().set("id", productId)
    };
    return this.http.put<any>(`${environment.ApiUrl}api/UserInfo`, product, httpOptions);
  }
  delete(productId) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token'))),
      params: new HttpParams().set("id", productId)
    };
    return this.http.delete<any>(`${environment.ApiUrl}api/UserInfo`, httpOptions);
  }

}
