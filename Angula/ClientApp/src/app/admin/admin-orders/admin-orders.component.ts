import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormControlName, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(''),
    cities: new FormArray([
      new FormControl('SF'),
      new FormControl('NY'),
    ]),
  });

  get cities(): FormArray {
    return this.form.get('cities') as FormArray;
  }
  ngOnInit() {
    // this.contactList = this.productForm.get('quantities').value as FormArray;
  }
  addCity() {
    this.cities.push(new FormControl());
    console.log(this.cities);
  }

  onSubmit() {
    console.log(this.cities.value);  // ['SF', 'NY']
    console.log(this.form.value);    // { cities: ['SF', 'NY'] }
  }

  setPreset() {
    this.cities.patchValue(['LA', 'MTV']);
  }
}
