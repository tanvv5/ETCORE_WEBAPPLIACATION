import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { cartInfo } from '../../_models/CartInfo';

@Component({
  selector: 'app-cart-left',
  templateUrl: './cart-left.component.html',
  styleUrls: ['./cart-left.component.css']
})
export class CartLeftComponent implements OnInit {
  cartinfo: cartInfo;
  constructor(private cartserice :CartService) { }

  ngOnInit() {
    this.cartinfo = this.cartserice.cartinfo;
    console.log("cartinfo: ");
    console.log(this.cartinfo);
  }

}
