import { Injectable } from '@angular/core';
import { cartInfo } from '../_models/CartInfo';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartinfo: cartInfo;
  constructor() {
    if (localStorage.getItem('cartUser') != null) {
      this.cartinfo = JSON.parse(localStorage.getItem('cartUser'));
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
    localStorage.setItem('cartUser', JSON.stringify(this.cartinfo));
  }
}
