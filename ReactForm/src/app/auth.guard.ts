import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegistrationService } from './signup/registration.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: RegistrationService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/sign-in'])
      return false
    }
  }
}
