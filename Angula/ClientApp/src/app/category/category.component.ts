import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../_models/product';
import { Response } from '../_models/Response';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  public response: Response;
  constructor(private productService: ProductService, private activeRoote: ActivatedRoute, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.activeRoote.queryParams.subscribe(data => {
      let categoryId = data.categoryId;
      console.log("categoryId: " + categoryId);
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
    console.log("proid: "+product_id);
    this.productService.get(product_id)
      .then(result => {
        var obj = JSON.parse(JSON.stringify(result));
        if (obj.Message == "Success") {
          prod = obj.Model;
        }
      }, error => console.log(error));
    console.log("tìm sản phẩm lưu cart");
    console.log(prod);
    //this.cartService.addToCart(prod);
  }
}
