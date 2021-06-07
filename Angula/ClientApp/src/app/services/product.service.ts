import { map } from 'rxjs/operators';
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
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }
  create(product) {
    console.log(product);
    // return this.restAPI.post("api", "Products/add", product, null);
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token'))),
      params: null
    };
    return this.http.post<any>(`${environment.ApiUrl}api/Products/add`, product, httpOptions);
  }
  getAll() {
    return this.restAPI.get("api", "Products", null, null).toPromise().then(res=>res);
  }
  get(productId) {
    return this.restAPI.get("api", "Products/detail/" + productId, null, null).toPromise().then(res => res);
  }
  getproduct_in_keyword_category(keyword: any, category_id: any, pageSize: any, page: any) {
    let path: string = "Products/findproductincategory/" + pageSize + "/" + page + "/" + category_id+ "/" + keyword;
    // if (keyword) path = path + "/" + keyword;
    return this.restAPI.get("api", path,  null, null).toPromise().then(res => res);
  }
  getproduct_in_keyword_category_Pagging(keyword: any, category_id: any, pageSize: any, page: any) {
    return this.restAPI.get("api", "Products/findproductincategoryPagging/" + category_id + "/" + keyword + "/" + pageSize + "/" + page, null, null).toPromise().then(res => res);
  }
  update(productId, product) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token')))
    };
    return this.http.put<any>(`${environment.ApiUrl}api/Products/update/${productId}`, product, httpOptions).toPromise().then(res => res);
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
