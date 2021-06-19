import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service.service';
import { Product } from 'src/app/_models/product';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { HttpEventType } from '@angular/common/http';
import { Category } from 'src/app/_models/Category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Category[];
  formProduct: FormGroup;
  id: any;
  loading = false;
  submitted = false;
  public response: Response;
  selectedFiles: FileList;
  progressInfos = [];
  product: Product;
  isAddMode: boolean;
  @Output() addSuccess = new EventEmitter<string>();
  //#region contructor and init
  constructor(private alertService: AlertService, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService,
    private productService: ProductService, private formBuilder: FormBuilder, private uploadService: UploadFilesService) {
    categoryService.getCategories().then(result => {
      var obj = JSON.parse(JSON.stringify(result));
      this.response = new Response();
      if (obj.Message == "Success") {
        this.categories$ = JSON.parse(JSON.stringify(obj.Model));
      }
    }, error => console.log(error));
  }
  ngOnInit() {
    this.isAddMode = true;
    //khởi tạo giá trị form
    this.formProduct = this.formBuilder.group({
      ProName: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      ProCategory: ['', Validators.required],
      Unit: [''],
      StockQuatity: ['', [Validators.required, Validators.min(0)]],
      Description: [''],
      Status: ['1']
    });
    //trường hợp edit sản phẩm
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    })
    if (this.id) {
      this.productService.get(this.id).then(p => {
        if (p.Message == "Success") {
          this.product = p.Model;
          console.log("edit sản phẩm: ");
          console.log(this.product);
          this.formProduct.patchValue(this.product);
        }
      });
      this.isAddMode = false;
    }
  }
  //#endregion contructor and init
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formProduct.invalid) {
      return;
    }

    this.loading = true;
    var numProact = Number(this.formProduct.get("ProCategory").value);
    this.formProduct.patchValue({
      ProCategory: numProact
    });
    this.product = this.formProduct.value;
    console.log(this.product);
    if (this.isAddMode)
      this.productService.create(this.product)
        .pipe(first())
        .subscribe(
          data => {
            console.log(JSON.stringify(data));
            if (data.Message == "Success") {
              this.alertService.success("thêm mới sản phẩm thành công.", true);
              this.addSuccess.emit("true");
              this.uploadFiles(data.Result);
              this.router.navigate(['/admin/products']);
            }
            else {
              console.log(JSON.stringify(data.Result));
              this.alertService.error(data.Result);
              this.loading = false;
            }
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    else {
      this.product.ProId = Number(this.id);
      this.productService.update(this.id, this.product)
        .then(
          data => {
            console.log(JSON.stringify(data));
            if (data.Message == "Success") {
              this.alertService.success("Cập nhật sản phẩm thành công.", true);
              this.uploadFiles(data.Result);
              this.router.navigate(['/admin/products']);
            }
            else {
              console.log(JSON.stringify(data.Result));
              this.alertService.error(data.Result);
              this.loading = false;
            }
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }
  get f() { return this.formProduct.controls; }
  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  selectFiles(event) {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }
  uploadFiles(proId: any) {
    console.log(this.selectFiles);
    if (this.selectedFiles!==undefined)
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i], proId);
      }
  }
  upload(idx, file, proId: any) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file, proId).subscribe(
      event => {
        console.log("upload file result");console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
      });
  }
}
