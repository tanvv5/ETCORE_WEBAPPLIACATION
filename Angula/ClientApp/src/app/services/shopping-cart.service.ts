import { Injectable } from '@angular/core';
import { forEachChild } from 'typescript';
import { Product } from '../_models/product';
import { ShoppingCart } from '../_models/shopping-cart';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private cartservice: CartService) { }

  addToCart(product: Product) {
    var shopcard: ShoppingCart = { product: product, quantity: 1 };    
    if (localStorage.getItem('card') == null) {
      let card: any = [];
      card.push(JSON.stringify(shopcard));
      localStorage.setItem('card', JSON.stringify(card));
    }
    else {
      let card: any = JSON.parse(localStorage.getItem('card'));
      let index: number = -1;
      for (var i = 0; i < card.length; i++) {
        let it = JSON.parse(card[i]);
        if (it.product.ProId == product.ProId) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        card.push(JSON.stringify(shopcard));
        localStorage.setItem('card', JSON.stringify(card));
      }
      else {
        let itcardupdate = JSON.parse(card[index]);
        console.log(itcardupdate);
        shopcard.quantity = itcardupdate.quantity+1;
        card[index] =JSON.stringify(shopcard);
        localStorage.setItem('card', JSON.stringify(card));
      }
    }
    this.loadcart();
  }
  removeFromCart(product: Product) {
    if (localStorage.getItem('card') != null) {
      let card: any = JSON.parse(localStorage.getItem('card'));
      for (var i = 0; i < card.length; i++) {
        let itcardupdate = JSON.parse(card[i]);
        if (itcardupdate.product.ProId == product.ProId) {
          itcardupdate.quantity--;
          card[i] = JSON.stringify(itcardupdate);
          localStorage.setItem('card', JSON.stringify(card));
          break;
        }
      }
    }
    this.loadcart();
  }
  loadcart() {
    let card: any = JSON.parse(localStorage.getItem('card'));
    let total: number=0;
    let items: number=0;
    for (var i = 0; i < card.length; i++) {
      let it = JSON.parse(card[i]);
      items += 1;
      total += (it.product.Price * it.quantity);
    }
    this.cartservice.update(total,items);
  }
}
