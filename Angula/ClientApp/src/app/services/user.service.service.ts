import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models';
import { AppSettings } from '../_share/AppSettings';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer ".concat(localStorage.getItem('token')))
    return this.http.get<any>(`${environment.ApiUrl}api/UserInfo`, { headers: header });
  }

  getToken(password: string, userName: string) {
    const body = { Password: password, UserName: userName };
    const header = { 'content-type': 'application/json', 'Accept': 'application/json' };
    console.log("token body: " + body);
    return this.http.post<string>(`${environment.ApiUrl}api/Token`, body, { headers: header });
  }

  register(user: User) {
    return this.http.post(`${environment.ApiUrl}api/UserInfo`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.ApiUrl}users/${id}`);
  }
}
