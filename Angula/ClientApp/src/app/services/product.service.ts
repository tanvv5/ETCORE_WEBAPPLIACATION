import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../_models/Response';
import { RestAPI } from './RestAPI.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private restAPI: RestAPI) { }

  create(product) {
    
  }
  getAll() {
    return this.restAPI.get("api", "Products", null, null).toPromise().then(res=>res);
  }
  get(productId) {
    //const httpOptions = {
    //  headers: new HttpHeaders().set(
    //    "Authorization",
    //    "Bearer ".concat(localStorage.getItem('token'))),
    //  params: new HttpParams().set("id", productId)
    //};
    //return this.http.get<any>(`${environment.ApiUrl}api/Products/detail`, httpOptions).toPromise().then(res => res);
    return this.restAPI.get("api", "Products/detail/" + productId, null, null).toPromise().then(res => res);
  }
  getproduct_in_category(category_id: any) {
    return this.restAPI.get("api", "Products/findproductincategory/" + category_id, null, null).toPromise().then(res => res);

  }
  update(productId, product) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token'))),      
      params: new HttpParams().set("id", productId)
    };
    return this.http.put<any>(`${environment.ApiUrl}api/UserInfo`, product, httpOptions).toPromise().then(res => res);
  }
  delete(productId) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token'))),
      params: new HttpParams().set("id", productId)
    };
    return this.http.delete<any>(`${environment.ApiUrl}api/UserInfo`, httpOptions).toPromise().then(res => res);
  }

}
