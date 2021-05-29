import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../_models/Category';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  private categories: Category[];
  public response: Response;
  private categoryId: number;
  keyword: string;
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService
      .getCategories()
      .then(result => {
        var obj = JSON.parse(JSON.stringify(result));
        this.response = new Response();
        if (obj.Message == "Success") {
          this.categories = JSON.parse(JSON.stringify(obj.Model));
        }
      }, error => console.log(error));  
  }
  Search() {
    //alert((<HTMLInputElement>document.getElementById("SeachAllid")).value);
    this.router.navigate(['/search', { keyword: this.keyword, category: this.categoryId}]);
  }
}
