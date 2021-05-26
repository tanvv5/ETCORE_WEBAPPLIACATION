import { Injectable } from '@angular/core';
import { forEachChild } from 'typescript';
import { Product } from '../_models/product';
import { ShoppingCart } from '../_models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }
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
      for (var i = 1; i < card.length; i++) {
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
        shopcard.quantity++;
        card[index] =JSON.stringify(shopcard);
        localStorage.setItem('card', JSON.stringify(card));
      }
    }
  }
  removeFromCart(product: Product) {
    var shopcard: ShoppingCart = { product: product, quantity: 1 };
    if (localStorage.getItem('card') != null) {
      let card: any = JSON.parse(localStorage.getItem('card'));
      for (var i = 0; i < card.length; i++) {
        let it = JSON.parse(card[i]);
        if (it.product.ProId == product.ProId) {
          shopcard.quantity++;
          card[i] = JSON.stringify(shopcard);
          localStorage.setItem('card', JSON.stringify(card));
          break;
        }
      }
    }
  }
}
