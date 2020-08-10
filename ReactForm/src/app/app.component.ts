import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service'; // to check log in to the page

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   constructor(public _authService: RegistrationService) {} // see html file

  ngOnInit() {
    }
   
  }

