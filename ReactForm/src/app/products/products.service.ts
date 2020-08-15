import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _productURL = "http://localhost:3000/products";
  private _imgURL = "http://localhost:3000/products/";

  constructor( private _http: HttpClient ) { }

  showProducts() {
    return this._http.get<any>(this._productURL);
  }
  showImage(event) {
    return this._http.get<any>(this._imgURL )
  }
}
