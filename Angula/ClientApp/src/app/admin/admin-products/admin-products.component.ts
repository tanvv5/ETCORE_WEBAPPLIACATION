import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[];
  subscription: Subscription;
  items: Product[] = [];
  itemCount: number;
  public response: Response;
  constructor(private productService: ProductService, private alertService: AlertService) {
    this.productService.getAll()
    .then(result => {
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
  delete(item: any) {

  }
  ngOnInit() {
  }
}
