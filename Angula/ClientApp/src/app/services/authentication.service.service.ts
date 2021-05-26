import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from '../_models';
import { AppSettings } from '../_share/AppSettings';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service.service';
import { first, map } from 'rxjs/operators';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RestAPI } from './RestAPI.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements CanActivate  {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private alertService: AlertService, private router: Router, private restAPI: RestAPI) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    ///biến này lưu toàn cục nên nếu load lại trang thì loggedIn sẽ biến mất nhé nên phải setlại loggedIN
    if (localStorage.getItem('token'))
      this.loggedIn = new BehaviorSubject<boolean>(true);
  }
  canActivate(route, state: RouterStateSnapshot) {
    if (this.loggedIn.asObservable()) {
      return true;
    }
    else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  public get currentUserValue() {
    return this.currentUserSubject.asObservable();
  }
  get isLoggedIn() {
    //phải có thằng as observale này thì tự động truyền biến qua các component khác mà không cần load lại trang
    return this.loggedIn.asObservable(); 
  }

  public login(username, password) {
    const body = { Id: 0, Password: password, UserName: username };
    const header = { 'content-type': 'application/json', 'Accept': 'application/json', 'responseType': 'text','KeyAPI':'testAPIKeyFromAngular8' };
    return this.http.post<any>(`${environment.ApiUrl}api/Token/Login`, body, { headers: header })
      .pipe(map(data =>
      {
        var obj = JSON.parse(JSON.stringify(data));
        if (data.Message == "Success") {
          //localStorage.setItem('token', obj.Result);
          //console.log("token get api: " + obj.Result);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          var user = new User();
          user.Email = username;
          user.UserName = username;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn.next(true);
          this.currentUserSubject.next(user);
        }
        else {
          console.log("Sucesss? " + JSON.stringify(data.Message));
          console.log("result: " + obj.Result);
          this.loggedIn.next(false);
        }
        return obj;
      }));
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    //localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
  }
}
