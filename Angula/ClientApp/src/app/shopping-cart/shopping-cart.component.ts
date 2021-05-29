import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../_models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private items: ShoppingCart[] = [];
  private total: number;
  constructor(private route: ActivatedRoute, private router: Router, private cartservice: CartService) { }

  ngOnInit() {
    this.loadcart();
  }
  loadcart() {
    let total: number = 0;
    let items: number = 0;
    let card: any = JSON.parse(localStorage.getItem('card'));
    this.items = [];
    for (var i = 0; i < card.length; i++) {
      let it = JSON.parse(card[i]);
      console.log(it.product.ProName);      
      this.items.push({
        product: it.product,
        quantity: it.quantity
      });
      this.total += 1;
      items += 1;
      total += (it.product.Price * it.quantity);
    }
    this.cartservice.update(total, items);
  }
  addQuantity(id: number) {
    let card: any = JSON.parse(localStorage.getItem('card'));
    for (var i = 0; i < card.length; i++) {
      let it = JSON.parse(card[i]);
      if (it.product.ProId == id) {
        if (it.quantity < 10) {
          it.quantity++;
          card[i] = JSON.stringify(it);
          localStorage.setItem('card', JSON.stringify(card));
          break;
        }
      }
    }
    this.loadcart();
  }

  removeQuantity(id: number) {
    let card: any = JSON.parse(localStorage.getItem('card'));
    for (var i = 0; i < card.length; i++) {
      let it = JSON.parse(card[i]);
      if (it.product.ProId == id) {
        if (it.quantity > 1) {
          it.quantity--;
          card[i] = JSON.stringify(it);
          localStorage.setItem('card', JSON.stringify(card));
          break;
        }
      }
    }
    this.loadcart();
  }
  removeProduct(id: number) {
    let card: any = JSON.parse(localStorage.getItem('card'));
    for (var i = 0; i < card.length; i++) {
      let it = JSON.parse(card[i]);
      if (it.product.ProId == id) {
        card.pop(card[i]);
        localStorage.setItem('card', JSON.stringify(card));
        break;
      }
    }
    this.loadcart();
  }
}
