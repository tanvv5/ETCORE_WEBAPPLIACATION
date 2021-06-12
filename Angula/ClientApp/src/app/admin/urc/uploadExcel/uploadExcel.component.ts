import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AnyAaaaRecord } from 'dns';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service.service';
@Component({
  selector: 'app-uploadExcel',
  templateUrl: './uploadExcel.component.html',
  styleUrls: ['./uploadExcel.component.scss']
})
export class UploadExcelComponent implements OnInit {
  file: File;
  arrayBuffer: any;
  filelist: any;
  products: any;
  constructor(private alertService: AlertService,private exportAsExcel: ExcelService,private productService: ProductService) { }

  ngOnInit() {
  }
  addfile(event) {
    let isExcel: boolean;
    this.file = event.target.files[0];
    if (this.file.type.match('sheet.*')==null) {
      isExcel = false;
      alert('invalid format xlsx!');
      return;
    }
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.products = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.products.forEach(x=>{
        if(x.hasOwnProperty('Status')){
          x.Status = "1";
          console.log(x.Status);
        }
      });
    }
  }
  uploadfile(){
    if(this.products)
      this.productService.create_multi(this.products)
      .pipe(first())
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          if (data.Message == "Success") {
            this.alertService.success("thêm mới sản phẩm thành công.", true);
            // this.router.navigate(['/admin/products']);
          }
          else {
            console.log(JSON.stringify(data.Result));
            this.alertService.error(data.Result);
          }
        },
        error => {
          this.alertService.error(error);
        });

  }
}
