import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestAPI } from './RestAPI.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private restAPI: RestAPI) { }

  getCategories(){
    return this.restAPI.get("api/Category", "FindAll", null, null).toPromise().then(res=>res);
    //let ListCategory: string[] = ['Apple', 'Orange', 'Banana'];
    //return ListCategory;
  }
}
