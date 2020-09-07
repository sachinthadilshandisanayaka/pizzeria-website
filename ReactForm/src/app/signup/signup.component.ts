import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { nameValidator } from '../share/user-name.validator';
import { passwordValidator } from '../share/password.validator';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public allredyUse = false; 
  registationForm: FormGroup;
  constructor(private fb: FormBuilder, private _registrationService: RegistrationService,private _router: Router) {}

  ngOnInit() {
    this.registationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), nameValidator(/password/), nameValidator(/sanju/)]],
      email: [''],
      subscribe: [false],
      password: ['', [Validators.required]],
      conformPassword: ['']
    }, {validator: passwordValidator});

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

  get nameValidate(){
    return this.registationForm.get('username');
  }
  get getEmail(){
    return this.registationForm.get('email');
  }

  // registationForm = new FormGroup({
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   conformPassword: new FormControl('')
  // });

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
          if( res.message == 'Email is already used') {
            console.log('email is already used !');
            this.allredyUse = true;
          } else {
            console.log('Success !!', res.message);
            // this._router.navigate(['oders']);
            // localStorage.setItem('token', res.token);
            this.allredyUse = false;
            this._router.navigate(['sign-in']);
            // this.registationForm.patchValue({
            //   username: '',
            //   email: '',
            //   subscribe: false,
            //   password: '',
            //   conformPassword: ''
            // });
          }
        },
        error =>console.error('Error !', error)
      );
  }

}
