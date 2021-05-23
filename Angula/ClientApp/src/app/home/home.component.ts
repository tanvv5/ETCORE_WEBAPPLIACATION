import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service.service';
import { ProductService } from '../services/product.service';
import { Product } from '../_models/product';
import { Response } from '../_models/Response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  category: string;
  filteredProducts: Product[] = [];
  public response: Response;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService, private alertService: AlertService) {
    this.productService
      .getAll()
      .subscribe(result => {
        var obj = JSON.parse(JSON.stringify(result));
        this.response = new Response();
        if (obj.Message == "Success") {
          this.filteredProducts = JSON.parse(JSON.stringify(obj.Model));
        }
        else {
          this.alertService.error(obj.ErrorMessage);
        }       
      }, error => console.log(error));
    console.log(this.products);
  }

  async ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
