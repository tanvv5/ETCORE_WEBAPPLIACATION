import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { delay, first, map, switchMap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service.service';
import { UserService } from '../services/user.service.service';
import { AuthenticationService } from '../services/authentication.service.service';
import { Response } from '../_models/Response';
import { UserRegister } from '../_models/user_register';
import { CustomvalidateService } from '../services/customvalidate.service';
import { BehaviorSubject } from 'rxjs';
import { AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  public response: Response;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
    , private customValidator: CustomvalidateService
  ) {
    this.authenticationService.isLoggedIn.subscribe(data => {
      if (data) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', {
        validators: [Validators.required],
        asyncValidators: [this.userExistsValidator()],
        updateOn: 'blur'
      }],
      password: ['', [Validators.required, Validators.minLength(8), this.createPasswordStrengthValidator]]
    });
  }
  userExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.authenticationService.checkexistusername(control.value)
        .pipe(
          map(rs => rs ? { 'existsUser': true }  : null)
        );
    }
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
    var result = !passwordValid ? { passwordStrength: true } : null;
    console.log(result);
    console.log("control pass: ");
    console.log(control);
    return result;
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    var user_info: UserRegister = new UserRegister();
    user_info.UserName = this.registerForm.get('username').value;
    user_info.Password = this.registerForm.get("password").value;
    this.userService.register(user_info)
      .pipe(first())
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          if (data.Message == "Success") {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          }
          else {
            console.log(JSON.stringify(data.Result));
            this.alertService.error(data.Result);
            this.loading = false;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
