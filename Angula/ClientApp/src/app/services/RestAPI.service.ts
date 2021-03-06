import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RestAPI {
  private BASE_URL = environment.ApiUrl;
  private UserName = "tan.hondacuoi@gmail.com";
  private PassWord = "Vantan@2125";
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.Gettoken();
  }
  Gettoken() {
    const body = { Id: 0,Password: this.PassWord, UserName: this.UserName };
    const header = { 'content-type': 'application/json', 'Accept': 'application/json', 'responseType': 'text', 'KeyAPI': '' };
    var dateexpire = this.jwtHelper.getTokenExpirationDate(localStorage.getItem('token'));
    var d = new Date();
    if (d > dateexpire || localStorage.getItem('token') == null) {
      console.log(this.BASE_URL +"api/Token");
      this.http.post<any>(`${this.BASE_URL}api/Token`, body, { headers: header })
        .pipe(first()).subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          console.log(" check abcd: " + JSON.stringify(data));
          if (data.Message == "Success") {
            localStorage.setItem('token', obj.Result);
            console.log("token get api: " + obj.Result);
          }
          else {
            console.log("Sucesss? " + JSON.stringify(data.Message));
            console.log("result: " + obj.Result);
          }
        });
    }
    else {
      console.log("Token còn hiệu lực: " + localStorage.getItem('token'));
      console.log("Time create: " + dateexpire.toString());
      console.log("Token check: " + d.toString());
    }
  }
  baseURL(ControllerName: string, actionName: string):string {
    return this.BASE_URL + ControllerName + "/" + actionName;
  }

  get(ControllerName: string, actionName: string, body: any, param: HttpParams) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token'))),
      body,
      params: param
    };
    return this.http.get<any>(this.baseURL(ControllerName, actionName), httpOptions);
  }
  post(ControllerName: string, actionName: string, body: any, param: HttpParams) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer ".concat(localStorage.getItem('token'))),
      body,
      params: param
    };
    return this.http.post<any>(this.baseURL(ControllerName, actionName), httpOptions);
  }

  //update(productId, product) {
  //  const httpOptions = {
  //    headers: new HttpHeaders().set(
  //      "Authorization",
  //      "Bearer ".concat(localStorage.getItem('token'))),
  //    params: new HttpParams().set("id", productId)
  //  };
  //  return this.http.put<any>(`${this.BASE_URL}api/UserInfo`, product, httpOptions);
  //}
  //delete(productId) {
  //  const httpOptions = {
  //    headers: new HttpHeaders().set(
  //      "Authorization",
  //      "Bearer ".concat(localStorage.getItem('token'))),
  //    params: new HttpParams().set("id", productId)
  //  };
  //  return this.http.delete<any>(`${this.BASE_URL}api/UserInfo`, httpOptions);
  //}

}
