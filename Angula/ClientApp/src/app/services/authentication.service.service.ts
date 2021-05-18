import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from '../_models';
import { AppSettings } from '../_share/AppSettings';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service.service';
import { first, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    ///biến này lưu toàn cục nên nếu load lại trang thì loggedIn sẽ biến mất nhé nên phải setlại loggedIN
    if (localStorage.getItem('token'))
      this.loggedIn = new BehaviorSubject<boolean>(true);
  }

  public get currentUserValue() {
    return this.currentUserSubject.asObservable();
  }
  get isLoggedIn() {
    //phải có thằng as observale này thì tự động truyền biến qua các component khác mà không cần load lại trang
    return this.loggedIn.asObservable(); 
  }

  public login(username, password) {
    const body = { Password: password, UserName: username };
    const header = { 'content-type': 'application/json', 'Accept': 'application/json', 'responseType': 'text' };
    return this.http.post<any>(`${environment.ApiUrl}api/Token`, body, { headers: header })
      .pipe(map(data => {
        localStorage.setItem('token', data);
        console.log("token get api: " + data);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        var user = new User();
        user.Email = username;
        user.Email = username;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.loggedIn.next(true);
        this.currentUserSubject.next(user);
        return data;
      }));
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
  }
}
