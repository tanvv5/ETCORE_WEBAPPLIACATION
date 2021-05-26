import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: any[];
  product = {};
  id;
  public response: Response;
  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private productService: ProductService) {
    categoryService.getCategories().then(result => {
      var obj = JSON.parse(JSON.stringify(result));
      this.response = new Response();
      if (obj.Message == "Success") {
        this.categories$ = JSON.parse(JSON.stringify(obj.Model));
      }
      //else {
      //  this.alertService.error(obj.ErrorMessage);
      //}
      console.log(this.categories$);
    }, error => console.log(error));;

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) {
      this.productService.get(this.id).pipe(first()).subscribe(p => this.product = p);
    }

  }
  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit() {
  }
}
