import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../_models/Category';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  private categories: Category[];
  public response: Response;
  constructor(private categoryService: CategoryService) {
  }

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
  getSliderValue(event: any){
    console.log(event.target.value);
  }
}
