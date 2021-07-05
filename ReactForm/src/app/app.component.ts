import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './dialog/logout-dialog/logout-dialog.component';
import { RegistrationService } from './signup/registration.service'; // to check log in to the page

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isScroll = false;

  constructor(
    public _authService: RegistrationService,
    public dialog: MatDialog,
  ) { } // see html file

  ngOnInit() {
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 80) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  openLogoutDialog() {
    let dialofRef = this.dialog.open(LogoutDialogComponent);
    dialofRef.afterClosed().subscribe(result => {
      if (result === "true") {
        console.log("true");
        this._authService.logoutUser();
      } else if (result === "false") {
        console.log("false");
      }
    });

  }
}

