import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OdersService {

  private _oderUrl = "http://localhost:3000/orders";
  private _oderselectUrl = "http://localhost:3000/orders/";


  constructor(private _http: HttpClient) { }

  getorders() {
    return this._http.get<any>(this._oderUrl);
  }
  selectOder(orderId) {
    return this._http.get<any>(this._oderselectUrl+orderId)
  }
}
