import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { AlertService } from '../services/alert.service.service';
import { AuthenticationService } from '../services/authentication.service.service';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    //redirect to home if already logged in
    this.authenticationService.isLoggedIn.subscribe(data => {
      if (data) {
        console.log("neeu login thi ve trang chur: " + data);
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //// get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.Message == "Success") {
            console.log(JSON.stringify(data.Result));
            this.router.navigate([this.returnUrl]);
          }
          else {
            console.log(JSON.stringify(data.Result));
            this.alertService.error(data.Result);
            this.loading = false;
          }
        },
        error => {
          console.log(JSON.stringify(error));
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
