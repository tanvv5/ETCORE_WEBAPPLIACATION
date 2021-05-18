import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service.service';
import { User } from '../_models';
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
  constructor(private http: HttpClient, private userService: UserService) {
    //this.getProduct();
  }
  ngOnInit() {
    this.userService.getAll().subscribe(result => {
      this.users = result;
      console.log("User get api 1:" + this.users[0].UserName);
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
  //public getToken() {
  //  const body = {Password:'Vantan@2125',UserName:};
  //  const header = { 'content-type': 'application/json', 'Accept': 'application/json'};
  //  console.log("token body: " + body);
  //  return this.http.post<string>(`${environment.ApiUrl}api/Token` body, { headers: header }).subscribe(result => {
  //    localStorage.setItem('id_token', result);
  //    console.log("token get api: " + result);
  //  }, error => console.log(error));
  //}
  public getProduct() {    
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem('token'))
    return this.http.get<User[]>("http://localhost:5000/api/UserInfo", { headers: header }).subscribe(result => {
      this.users = result;
      console.log("item 1:"+this.users[0].UserName); 
      //for (var i = 0; i < obj.length; i++) {
      //  let objuser_add: Users = JSON.parse(JSON.stringify(obj[i]));
      //  this.users.push(objuser_add);
      //}
    }, error => console.log(error));
  }
}

