import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service.service';
import { UserService } from '../services/user.service.service';
import { AuthenticationService } from '../services/authentication.service.service';
//import { User } from 'oidc-client';
import { Response } from '../_models/Response';
import { UserRegister } from '../_models/user_register';


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
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
