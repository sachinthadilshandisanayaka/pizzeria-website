import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  public emailErro = false;
  public passwordErro = false;
  public EmailError = '';
  public PasswordError = '';

  signinForm: FormGroup;
  constructor(private fb: FormBuilder, private _signinService: SigninService, private _router: Router) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get getEmailAdress() {
    return this.signinForm.get('email');
  }
  get password() {
    return this.signinForm.get('password');
  }

  onSubmit() {
    console.log(this.signinForm.value);
    this._signinService.signin(this.signinForm.value)
      .subscribe(
        res => {
          if (res.message == 'Email is incorrect!') {
            console.log(res.message);
            return (this.emailErro = true, this.EmailError = res.message, this.passwordErro = false);

          }
          if (res.message == 'password is incorrect') {
            console.log(res.message);
            return (this.passwordErro = true, this.PasswordError = res.message, this.emailErro = false);
          }
          else {
            console.log('Loging success !', res);
            this._router.navigate(['home']);
            localStorage.setItem('token', res.token);

            this.emailErro = false;
            this.passwordErro = false;
            this.EmailError = '';
            this.PasswordError = '';
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
