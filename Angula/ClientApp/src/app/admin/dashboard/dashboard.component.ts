import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../../_models/user_register';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  UserRegisters: UserRegister[] = [
    { FirstName: "11", LastName: 'Tân Vũ', UserName:"Tân Vũ",Password:"11111" },
    { FirstName: "12", LastName: 'Mr. Nice', UserName:"Hùng",Password:"22222" },
    { FirstName: "13", LastName: 'Mr. Nice', UserName:"nam",Password:"333333" },
    { FirstName: "14", LastName: 'Mr. Nice', UserName:"Tuấn",Password:"44444" },
    { FirstName: "15", LastName: 'Mr. Nice', UserName:"Hương",Password:"555522" }
  ];
  selecteduserRegister: UserRegister;
  power: number = 2;
  factor: number = 2;
  constructor() { }
  onSelect(userRegister: UserRegister): void {
    this.selecteduserRegister = userRegister;
  }
  setUppercaseName(obj) {
    this.selecteduserRegister.UserName = obj.toUpperCase();
  }
  ngOnInit() {
  }

}
