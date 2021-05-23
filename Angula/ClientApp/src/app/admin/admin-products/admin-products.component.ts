import { Component, OnInit, OnDestroy } from '@angular/core';
//import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';
//import { AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  products: Product[];
  subscription: Subscription;
  items: Product[] = [];
  itemCount: number;
  public response: Response;
  constructor(private productService: ProductService, private alertService: AlertService) {
    this.subscription = this.productService.getAll()
    .subscribe(result => {
        var obj = JSON.parse(JSON.stringify(result));
        this.response = new Response();
        if (obj.Message == "Success") {
          this.products = JSON.parse(JSON.stringify(obj.Model));
          this.items = this.products;
        }
        else {
          console.log(JSON.stringify(obj.Result));
          this.alertService.error(obj.ErrorMessage);
        }
      }, error => console.log(error));
  }
  reloadItems(params) {
    if (!this.products) {
      return;
    }
    this.items = this.products;
  }

  ngOnInit() {
  }
}
