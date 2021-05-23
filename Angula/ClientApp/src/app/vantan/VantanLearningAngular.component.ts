import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AlertService } from '../services/alert.service.service';
import { AuthenticationService } from '../services/authentication.service.service';
import { UserService } from '../services/user.service.service';
import { User } from '../_models';
import { Response } from '../_models/Response';
import { AppSettings } from '../_share/AppSettings';

@Component({
  selector: 'app-component-VantanLearningAngular',
  templateUrl: './VantanLearningAngular.component.html'
})
export class VantanLearningAngularcomponent implements OnInit  {
  public currentCount = 0;
  public data = {
    title: 'Các bạn',
    website: 'Angular van tan'
  }
  public users: User[];
  public response: Response;
  //public users: any[] = [];
  public incrementCounter() {
    this.currentCount++;
  }
  headers: Headers;
  pageOfItems: Array<any>;
  public items = [];
  //phân trang cho dữ liệu get json từ API
  public curPage: number;
  public pageSize: number;
  isLoggedIn: boolean;
  constructor(private http: HttpClient, private userService: UserService, private authenticationService: AuthenticationService, private router: Router, private alertService: AlertService) {
    this.authenticationService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      if (this.isLoggedIn==false) {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit() {
    this.userService.getAll().subscribe(result => {
      var obj = JSON.parse(JSON.stringify(result));
      this.response = new Response();
      if (obj.Message == "Success") {
        this.users = JSON.parse(JSON.stringify(obj.Model));
      }
      else {
        console.log(JSON.stringify(obj.Result));
        this.alertService.error(obj.ErrorMessage);
      }
    }, error => console.log(error));
    // an example array of 150 items to be paged
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));
    this.curPage = 1;
    this.pageSize = 15; // any page size you want
  }
  numberOfPages() {
    return Math.ceil(this.users.length / this.pageSize);
  };
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log(pageOfItems);
  }
}

