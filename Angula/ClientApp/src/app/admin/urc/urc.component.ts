import { ProductService } from './../../services/product.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, ElementRef, OnInit, Output, ViewChild, PipeTransform } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/services/excel.service';
import { Product } from 'src/app/_models/product';
import { CurrencyPipe, formatDate, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';
export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-urc',
  templateUrl: './urc.component.html',
  styleUrls: ['./urc.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },DatePipe,CurrencyPipe
  ]
})
export class URCComponent implements OnInit {
  @ViewChild('tableexport', { static: false })
  tableexport?: ElementRef<HTMLElement>;
  title = 'exportExcelInAngular';
  formsearch: FormGroup;
  showModal: boolean;
  products: Product[] = [];
  submitted =false;
  constructor(private currencyPipe: CurrencyPipe,private datePipe: DatePipe,private formBuilder: FormBuilder,private excelService:ExcelService,private productService: ProductService) { }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
  }
  get f(){
    return this.formsearch.controls;
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  closepopup(result: string){
    if(result==="true"){
      this.hide();
    }
  }
  export_excel():void {
    this.excelService.exportTableAsExcelFile(this.tableexport.nativeElement, 'footballer_data');
  }
  ngOnInit() {
    this.formsearch =this.formBuilder.group({
      name: ['', [Validators.required,Validators.email]],
      regno: ['', [Validators.required,Validators.min(9)]],
      phone: ['',[Validators.required,this.PhoneValidator]],
      groupcustome: [''],
      daterecall: [''],
      statusCall: [''],
      contractno: [''],
      cluster: [''],
    });
  }
  PhoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const phoneValidator = /^[0-9\-\+]{9,15}$/.test(value);
    var result = !phoneValidator ? { phoneValidator: true } : null;
    console.log(result);
    return result;
  }
  // fomrmatdate(date: any){
  //   console.log(date.target.value);
  //   console.log(moment(date.target.value).format('DD/MM/YYYY'));
  // }
  onchangephone(phonevalue: any){
    console.log(phonevalue.target.value);
    // this.formsearch.patchValue({phone:(Number).parseInt(phonevalue.target.value)+10000});
  }
  onSubmit(){
    this.submitted = true;
    if(this.formsearch.invalid){
      console.log(this.formsearch.controls);
      return;
    }
    let param = new HttpParams();
    param = param.append('pageSize','9');
    param = param.append('currentPage','1');
    // if(categoryId) param = param.append('categoryId',categoryId);
    // if(keyword)  param = param.append('keyword',keyword);
    this.productService.getproduct_in_keyword_category(param)
    .then(result => {
      var obj = JSON.parse(JSON.stringify(result));
      if (obj.Message == "Success") {
        this.products = obj.Model;
      }
      console.log(this.products);
    }, error => console.log(error));
  }
}

