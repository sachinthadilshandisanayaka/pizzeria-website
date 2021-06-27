import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _productURL = "http://localhost:3000/products";
  private _selectProductURL = "http://localhost:3000/products/";

  constructor(private _http: HttpClient) { }

  getProducts() {
    return this._http.get<any>(this._productURL);
  }
  getOneProduct(productId) {
    return this._http.get<any>(this._selectProductURL + productId);
  }
}
