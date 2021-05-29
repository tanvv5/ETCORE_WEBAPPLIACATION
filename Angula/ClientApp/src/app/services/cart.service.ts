import { Injectable } from '@angular/core';
import { cartInfo } from '../_models/CartInfo';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartinfo: cartInfo;
  constructor() {
    if (localStorage.getItem('cartitem') != null) {
      this.cartinfo = JSON.parse(localStorage.getItem('cartitem'));
    }
    else {
      this.cartinfo = {
        items: 0,
        total: 0
      }
    }
  }
  public update(total: number, item: number) {
    this.cartinfo.total = total;
    this.cartinfo.items = item;
    localStorage.setItem('cartitem', JSON.stringify(this.cartinfo));
  }
}
