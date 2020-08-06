import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  
  _url = 'http://localhost:3000/user/signin';
  constructor(private _http: HttpClient) { }

  signin(userData) {
    return this._http.post<any>(this._url, userData);
  }
}
