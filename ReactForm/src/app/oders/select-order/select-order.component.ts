import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OdersService } from '../oders.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.css']
})
export class SelectOrderComponent implements OnInit {

  orderId: any;
  selectOrder: any;
  errorMessage = '';
  errorMessageFromDelete = '';

  constructor(private _odersService: OdersService,
    private _router: Router, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.orderId = idParam.toString();
    this._odersService.selectOder(this.orderId)
      .subscribe(
        result => {
          console.log(result);
          this.selectOrder = result;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.errorMessage = err.error;
              console.log(err.error);
            }
          }
        }
      );
  }
  deleteOrder(event: any) {
    this._odersService.deleteOrder(event)
      .subscribe(
        result => {
          console.log(result.message);
          window.location.reload();
          this._location.back();
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              this.errorMessageFromDelete = error.error;
              console.log(error.error);
            }
          }
        }
      );
  }

}
