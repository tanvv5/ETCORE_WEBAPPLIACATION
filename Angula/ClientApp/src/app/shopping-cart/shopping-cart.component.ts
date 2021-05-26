import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCart } from '../_models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private items: ShoppingCart[] = [];
  private total: number;
  constructor(private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    //this.items = JSON.parse(localStorage.getItem('card'));
    let card: any = JSON.parse(localStorage.getItem('card'));
    console.log(card);
    for (var i = 0; i < card.length; i++) {
      let it = JSON.parse(card[i]);
      console.log(it.product.ProName);
      this.items.push({
        product:it.product,
        quantity : it.quantity
      });
      this.total += 1;
    }
  }

}
