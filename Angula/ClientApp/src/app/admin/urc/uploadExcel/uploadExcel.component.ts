import { ProductService } from './../../../services/product.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service.service';
import { HttpEventType } from '@angular/common/http';
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
  @Output() addSuccess = new EventEmitter<string>();
  constructor(private alertService: AlertService, private exportAsExcel: ExcelService, private productService: ProductService) { }

  ngOnInit() {
  }
  addfile(event) {
    let isExcel: boolean;
    this.file = event.target.files[0];
    if (this.file.type.match('sheet.*') == null) {
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
      //check validate not null and has form template
      let hascolumn = ["ProId", "ProName", "ProCategory", "Unit", "StockQuatity", "Price", "Status", "Description"];

      let error_column: string = "";
      hascolumn.forEach(element => {
        if (this.products) {
          var item0 = this.products[0];
          console.log(element);
          if (!item0.hasOwnProperty(element)) {
            error_column += "thiếu cột " + element + ", ";
          };
        }
      });
      if (error_column != "") {
        this.alertService.error(error_column, true);
        this.products=null;
        return;
      }
      this.products.forEach(x => {
        if (x.hasOwnProperty('Status')) {
          x.Status = "1";
        }
      });
    }
  }
  uploadfile() {
    if (this.products!= null)
      // this.productService.create_multi(this.products)
      // .pipe(first())
      // .subscribe(
      //   data => {
      //     console.log(JSON.stringify(data));
      //     if (data.Message == "Success") {
      //       this.alertService.success("thêm mới sản phẩm thành công.", true);
      //       this.addSuccess.emit("true");
      //     }
      //     else {
      //       console.log(JSON.stringify(data.Result));
      //       this.alertService.error(data.Result);
      //     }
      //   },
      //   error => {
      //     this.alertService.error(error);
      //   });
      this.productService.create_multi_uploadfile(this.file).subscribe(
        event => {
          if (event.type === HttpEventType.Response) {
            var bd = JSON.parse(JSON.stringify(event.body));
            if (bd.Message === "Success") {
              this.alertService.success("thêm mới sản phẩm thành công.", true);
              this.addSuccess.emit("true");
            }
          }
        },
        err => {

        });
  }
}
