import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../../_models/user_register';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productForm: FormGroup;
  DisCountForm: FormGroup;
  submitted_t = false;
  submitted_tl = false;
  ResultList: any;
  startDateModel: Date;
  UserRegisters: UserRegister[] = [
    { FirstName: "11", LastName: 'Tân Vũ', UserName: "Tân Vũ", Password: "11111" },
    { FirstName: "12", LastName: 'Mr. Nice', UserName: "Hùng", Password: "22222" },
    { FirstName: "13", LastName: 'Mr. Nice', UserName: "nam", Password: "333333" },
    { FirstName: "14", LastName: 'Mr. Nice', UserName: "Tuấn", Password: "44444" },
    { FirstName: "15", LastName: 'Mr. Nice', UserName: "Hương", Password: "555522" }
  ];
  selecteduserRegister: UserRegister;
  power: number = 2;
  factor: number = 2;
  constructor(private formbuild: FormBuilder) {
    this.productForm = this.formbuild.group({
      quantities: new FormArray([this.newQuantity()])
    });
    this.DisCountForm = this.formbuild.group({
      startDate: [''],
      levels: new FormArray([this.newLevel()])
    });
  }
  newLevel() {
    return this.formbuild.group({
      sum: ['', [Validators.required, Validators.minLength(2)]],
      dis: ['', [Validators.required, Validators.minLength(2)]],
    })
  }
  addDiscount(): void {
    this.tl.push(this.newLevel());
  }

  removeDiscount(i: number) {
    this.tl.removeAt(i);
  }

  get f() { return this.productForm.controls; }
  get t() { return this.f.quantities as FormArray; }
  get fl() { return this.DisCountForm.controls; }
  get tl() { return this.fl.levels as FormArray; }
  onSelect(userRegister: UserRegister): void {
    this.selecteduserRegister = userRegister;
  }
  setUppercaseName(obj) {
    this.selecteduserRegister.UserName = obj.toUpperCase();
  }
  ngOnInit() {
    // this.contactList = this.productForm.get('quantities').value as FormArray;
  }
  //#region action form
  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
    this.ResultList = this.t.value;
    console.log(this.ResultList);
  }

  newQuantity(): FormGroup {
    return this.formbuild.group({
      qty: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }
  addQuantity(): void {
    this.t.push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.t.removeAt(i);
  }
  onSubmitDiscount() {
    this.submitted_tl = true;

    if (this.DisCountForm.invalid) {
      console.log("lỗi gì nào?");
      console.log(this.DisCountForm.controls.levels);
      return;
    }
  }
  //#endregion
}
