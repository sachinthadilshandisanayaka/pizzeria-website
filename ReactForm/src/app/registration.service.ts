import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url = 'http://localhost:3000/user/signup';
  constructor(private _http: HttpClient) { }

  register (userData) {
    return this._http.post<any>(this._url, userData);
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  getToken() {
    return localStorage.getItem('token')
  }

}