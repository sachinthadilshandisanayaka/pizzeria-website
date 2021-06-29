import { Component, OnInit, HostListener } from '@angular/core';
import { RegistrationService } from './signup/registration.service'; // to check log in to the page

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isScroll = false;
  constructor(public _authService: RegistrationService) { } // see html file

  ngOnInit() {
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 80) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }
}

