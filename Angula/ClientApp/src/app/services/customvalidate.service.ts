import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service.service';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidateService {

  constructor(private authenticationService: AuthenticationService ) { }
  checkUserExits(control: AbstractControl): { [key: string]: any } | null {
    let exitsval: Boolean = false;
    const value = control.value;
    if (!value) {
      return null;
    }
    //this.authenticationService.checkexistusername(control.value).then(rs => {
    //  var obj = JSON.parse(JSON.stringify(rs));
    //  console.log("ABCD: ");
    //  console.log(obj);
    //  if (rs.Message == "Success") {
    //    exitsval = true;
    //    console.log("sao ko dc: ");
    //    console.log(exitsval);
    //  }
    //  else {
    //    exitsval = false;
    //  }
    //});
    return exitsval ? { 'existsUser': true } : null;
  }
  createPasswordStrengthValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    console.log(passwordValid);
    return !passwordValid ? { passwordStrength: true } : null;
  }
}
