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
          console.log("current_user: ");
          console.log(data);
          result_boolean = data.Roles.includes("Admin");
          console.log(result_boolean);
        });
    return result_boolean;
  }

}
