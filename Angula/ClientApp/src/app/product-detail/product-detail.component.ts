import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  products_re: Product[];
  response: Response;
  constructor(private productService: ProductService, private activeRoote: ActivatedRoute, private cartService: ShoppingCartService) {
    this.activeRoote.queryParams.subscribe(data => {
      let ProId = data.ProId;
      console.log("ProId: " + ProId);
      this.productService.get(ProId)
        .then(result => {
          var obj = JSON.parse(JSON.stringify(result));
          if (obj.Message == "Success") {
            this.product = obj.Model;
          }
        }, error => console.log(error));
    });
  }
  addItemToCart(product) {
    let cart = this.cartService.addToCart(this.product);
  }
  ngOnInit() {

  }

}
