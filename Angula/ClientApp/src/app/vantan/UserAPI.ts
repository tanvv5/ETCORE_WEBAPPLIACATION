import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class UserAPI {

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get("https://jsonplaceholder.typicode.com/todos");
  }

}
