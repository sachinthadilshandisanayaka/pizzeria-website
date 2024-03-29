import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { nameValidator } from '../share/user-name.validator';
import { passwordValidator } from '../share/password.validator';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  public allredyUse = false;
  registationForm: FormGroup;
  constructor(private fb: FormBuilder, private _registrationService: RegistrationService, private _router: Router) { }

  ngOnInit() {
    this.registationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), nameValidator(/password/), nameValidator(/sanju/)]],
      email: ['', [Validators.required, Validators.email]],
      subscribe: [false],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]]
    }, { validator: passwordValidator });

    this.registationForm.get('subscribe').valueChanges
      .subscribe(getValue => {
        const email = this.registationForm.get('email');
        if (getValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  get password() {
    return this.registationForm.get('password');
  }
  get conformpassword() {
    return this.registationForm.get('conformPassword');
  }

  get nameValidate() {
    return this.registationForm.get('username');
  }
  get getEmail() {
    return this.registationForm.get('email');
  }

  loadData() {
    this.registationForm.patchValue({
      username: 'sachintha',
      email: 'sanju98@gmail.com',
      password: '12345',
      conformPassword: '12345'
    });
  }
  onSubmit() {
    console.log(this.registationForm.value);
    this._registrationService.register(this.registationForm.value)
      .subscribe(
        res => {

          if (res.message == 'Email is already used') {
            console.log('email is already used !');
            this.allredyUse = true;
          } else {
            console.log('Success !!', res.message);
            this.allredyUse = false;
            this._router.navigate(['sign-in']);
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('email is already used !!!!');
              this.allredyUse = true;
            }
          }
          console.error('Error !', err)
        }
      );
  }

}
