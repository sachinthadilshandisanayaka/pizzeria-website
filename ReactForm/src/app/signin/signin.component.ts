import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public emailErro = false;
  public passwordErro = false;
  public allError = null;

  signinForm: FormGroup;
  constructor(private fb: FormBuilder, private _signinService: SigninService, private _router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    console.log(this.signinForm.value);
    this._signinService.signin(this.signinForm.value)
      .subscribe(
        res => {
          if (res.message == 'Email is incorrect!') {
            return (this.emailErro = true, this.allError = res.message, this.passwordErro = false);
          } if (res.message == 'password is incorrect') {
            return (this.passwordErro = true, this.allError = res.message, this.emailErro = false);
          }
          else {
            console.log('Loging success !', res);
            // this._router.navigate(['/oders']);
            this._router.navigate(['home']);
            localStorage.setItem('token', res.token);

            this.emailErro = false;
            this.passwordErro = false;
            this.allError = null;
            this.signinForm.patchValue({
              email: '',
              password: ''
            });
          }
        },
        err => {
          console.log(err);
        }
      );

  }
}
