import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/_models/Category';
import { AlertService } from '../../services/alert.service.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  subscription: Subscription;
  items: Product[] = [];
  itemCount: number;
  public keywords: string = '';
  public categoryId: number;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public response: Response;
  private categories: Category[];
  public config: PaginationInstance = {
    id: 'product_page',
    itemsPerPage: 9,
    currentPage: 1,
    totalItems: 0
  };
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  public eventLog: string[] = [];
  private popped = [];
  constructor(private categoryService: CategoryService,private productService: ProductService, private alertService: AlertService, private activeRooter: ActivatedRoute) {
  }
  ngOnInit() {
    this.categoryService
    .getCategories()
    .then(result => {
      var obj = JSON.parse(JSON.stringify(result));
      this.response = new Response();
      if (obj.Message == "Success") {
        this.categories = JSON.parse(JSON.stringify(obj.Model));
      }
    }, error => console.log(error));
    this.reloadData(this.config.itemsPerPage, this.config.currentPage);
  }
  reloadData(pageSize: any, currentPage: any) {
    //cách 2 truyền bằng param
    let param = new HttpParams();
    if(pageSize) param = param.append('pageSize',pageSize);
    if(currentPage)  param = param.append('currentPage',currentPage);
    if(this.categoryId) param = param.append('categoryId',this.categoryId.toString());
    if(this.keywords)  param = param.append('keyword',this.keywords);
    this.productService.getproduct_in_keyword_category(param)
      .then(result => {
        var obj = JSON.parse(JSON.stringify(result));
        if (obj.Message == "Success") {
          this.items = obj.Model;
          this.config.totalItems = obj.ItemsCount;
          console.log("itemacount:");
          console.log(obj.ItemsCount);
          console.log(obj);
        }
      }, error => console.log(error));
  }
  filter(keyword:any){
    this.reloadData(this.config.itemsPerPage, this.config.currentPage);
  }
  delete(item: any) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    console.log(item);
  }
  //pagginate
  onPageChange(number: number) {
    console.log(`pageChange(${number})`);
    this.config.currentPage = number;
    this.reloadData(this.config.itemsPerPage, this.config.currentPage);
  }

  onPageBoundsCorrection(number: number) {
    console.log(`pageBoundsCorrection(${number})`);
    this.config.currentPage = number;
    this.reloadData(this.config.itemsPerPage, this.config.currentPage);
  }
}
