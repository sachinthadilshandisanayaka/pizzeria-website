import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _productURL = "http://localhost:3000/products";
  private _imgURL = "http://localhost:3000/products/";
  private _addProductURL = "http://localhost:3000/products";

  constructor(private _http: HttpClient) { }

  showProducts() {
    return this._http.get<any>(this._productURL)
  }
  showImage(event) {
    return this._http.get<any>(this._imgURL + event)
  }
  showSelectedProduct(productId) {
    return this._http.get<any>(this._imgURL + productId)
  }
  addProduct(event: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', event.name);
    formData.append('smallPrice', event.smallPrice);
    formData.append('mediamPrice', event.mediamPrice);
    formData.append('largePrice', event.largePrice);
    formData.append('description', event.description);
    formData.append('productImage', imageFile);

    // const header = new HttpHeaders();
    // const params = new HttpParams();

    // const options = {
    //   params,
    //   reportProgress: true,
    //   headers: header
    // };
    const req = new HttpRequest('POST', this._productURL, formData);
    return this._http.request(req);
  }
  patchProduct(itemsData, id) {
    return this._http.patch<any>(this._imgURL + id, itemsData);
  }
  deleteProduct(id: String) {
    return this._http.delete<any>(this._imgURL + id);
  }
}
