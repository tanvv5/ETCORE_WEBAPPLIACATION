import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../_models/product';
import { Response } from '../_models/Response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  public response: Response;
  constructor(private productService: ProductService, private activeRoote: ActivatedRoute, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.activeRoote.paramMap.subscribe(data => {
      let categoryId = data.get('category');
      console.log("categoryId: ");
      console.log(categoryId);
      this.productService.getproduct_in_category(categoryId)
        .then(result => {
          var obj = JSON.parse(JSON.stringify(result));
          if (obj.Message == "Success") {
            this.products = obj.Model;
          }
          console.log(this.products);
        }, error => console.log(error));
    });
  }
  addItemToCart(product_id) {
    //tìm product call api
    var prod: Product;
    console.log("proid: " + product_id);
    this.productService.get(product_id)
      .then(result => {
        var obj = JSON.parse(JSON.stringify(result));
        if (obj.Message == "Success") {
          prod = obj.Model;
        }
      }, error => console.log(error));
    this.cartService.addToCart(prod);
  }
}
