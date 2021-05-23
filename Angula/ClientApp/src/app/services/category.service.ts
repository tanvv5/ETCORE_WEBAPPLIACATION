import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): any[] {
    let ListCategory: string[] = ['Apple', 'Orange', 'Banana'];
    return ListCategory;
  }
}
