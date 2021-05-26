import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service.service';
import { User } from '../_models';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  isLoggedIn: boolean;
  user: User;
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }
  ngOnInit() {
    this.authenticationService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      console.log("isLoggedIn menu: " + data);
      var obj = JSON.parse(localStorage.getItem('currentUser'));
      //console.log("curent user: " + this.user.UserName);
    });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
