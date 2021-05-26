import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from '../services/alert.service.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Category } from '../_models/Category';
import { Product } from '../_models/product';
import { Response } from '../_models/Response';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  category: Category[] =[];
  filteredProducts: Product[] = [];
  public response: Response;
  subscription: Subscription;
  constructor( private route: ActivatedRoute, private productService: ProductService, private alertService: AlertService, private categoryService: CategoryService)
  {
     this.productService
      .getAll()
      .then(result => {
        var obj = JSON.parse(JSON.stringify(result));
        console.log("sao ko ra: "+JSON.stringify(result));
        this.response = new Response();
        if (obj.Message == "Success") {
          this.filteredProducts = JSON.parse(JSON.stringify(obj.Model));
        }
        else {
          this.alertService.error(obj.ErrorMessage);
        }       
      }, error => console.log(error));
    
    this.categoryService
      .getCategories()
      .then(result => {
        var obj = JSON.parse(JSON.stringify(result));
        this.response = new Response();
        if (obj.Message == "Success") {
          this.category = JSON.parse(JSON.stringify(obj.Model));
        }
        else {
          this.alertService.error(obj.ErrorMessage);
        }
        console.log(this.category);
      }, error => console.log(error));
  }
  async ngOnInit() {
  }
}
