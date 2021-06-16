import { ProductService } from './../../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, Output, ViewChild, PipeTransform } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/services/excel.service';
import { Product } from 'src/app/_models/product';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
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
      name: ['', Validators.required],
      regno: ['', Validators.required],
      phone: [''],
      groupcustome: [''],
      daterecall: [''],
      statusCall: [''],
      contractno: [''],
      cluster: [''],
    });
  }
  onchangephone(phonevalue: any){
    console.log(phonevalue.target.value);
    this.formsearch.patchValue({phone:(Number).parseInt(phonevalue.target.value)+10000});
  }
  onSubmit(){
    console.log(this.formsearch.value);
    this.productService.getproduct_in_keyword_category("", 1, 10, 1)
    .then(result => {
      var obj = JSON.parse(JSON.stringify(result));
      if (obj.Message == "Success") {
        this.products = obj.Model;
      }
      console.log(this.products);
    }, error => console.log(error));
  }
}

