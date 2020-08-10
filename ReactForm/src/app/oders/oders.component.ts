import { Component, OnInit } from '@angular/core';
import { OdersService } from './oders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css']
})
export class OdersComponent implements OnInit {

  oders = [];
  constructor(private _oderservice: OdersService,
              private _router: Router ) { }

  ngOnInit(): void {
    this._oderservice.getorders()
    .subscribe(
      res => {
        this.oders = res.Orders,
        console.log(this.oders)
      },
      err => {
        console.log(err)
        if ( err instanceof HttpErrorResponse ) {
          if ( err.status === 404 ) {           // check that back-end 'check-auth' return erro
            this._router.navigate(['/sign-in']) // if there is any erro then navigate to at the first
          }
        }
      }
    )
  }

}
