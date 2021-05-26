import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../_models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../_models/shopping-cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }
  ngOnInit() {
  }
  addItemToCart() {
    console.log("executed");
    let cart = this.cartService.addToCart(this.product);
  }

  removeItemFromCart() {
     let cart = this.cartService.removeFromCart(this.product);
    console.log('removeFromCart');
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    console.log(this.shoppingCart.quantity);
    return this.shoppingCart ? this.shoppingCart.quantity: 0;
  }

}
