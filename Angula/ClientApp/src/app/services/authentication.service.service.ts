import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { User } from '../_models';
import { AppSettings } from '../_share/AppSettings';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    const body = { Password: password, UserName: username };
    const header = { 'content-type': 'application/json', 'Accept': 'application/json' };
    return this.http.post<string>(`${environment.ApiUrl}api/Token`, body, { headers: header }).subscribe(result => {
      localStorage.setItem('token', result);
      console.log("token get api: " + result);
      var user = new User();
      user.Email = username;
      user.Email = username;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }, error => {
      console.log("log login: " + error.error);
      this.alertService.error(error.error);
    });
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
