import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
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
  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 9,
    currentPage: 1,
    totalItems: 0
  };
  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  public eventLog: string[] = [];

  private popped = [];
  constructor(private productService: ProductService, private activeRoote: ActivatedRoute, private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.reloadData(this.config.itemsPerPage, this.config.currentPage);
  }
  reloadData(pageSize: any, page: any) {
    this.activeRoote.paramMap.subscribe(data => {
      let categoryId = data.get('category');
      let keyword = data.get('keyword');
      console.log("categoryId: ");
      console.log(categoryId + ` page${pageSize}` + ` page${page}`);
      this.productService.getproduct_in_keyword_category_Pagging(keyword, categoryId, pageSize, page)
        .then(result => {
          var obj = JSON.parse(JSON.stringify(result));
          if (obj.Message == "Success") {
            this.products = obj.Model;
            this.config.totalItems = obj.ItemsCount;
            console.log("itemacount:");
            console.log(obj);
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
  //pagginate
  onPageChange(number: number) {
    console.log(`pageChange(${number})`);
    this.config.currentPage = number;
    this.reloadData(this.config.itemsPerPage, this.config.currentPage);
  }

  onPageBoundsCorrection(number: number) {
    console.log(`pageBoundsCorrection(${number})`);
    this.config.currentPage = number;
    this.reloadData(this.config.itemsPerPage, this.config.currentPage);
  }
}
