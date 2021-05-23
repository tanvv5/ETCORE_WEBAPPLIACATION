import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    var result_boolean: any;
    this.authService.currentUserValue
      .subscribe(
        data => {
          result_boolean= data.Roles.indexOf("Admin") > 0;
        });
    return result_boolean;
  }

}
