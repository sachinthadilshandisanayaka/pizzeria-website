import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OdersService } from '../oders.service';

@Component({
  selector: 'app-see-all-orders',
  templateUrl: './see-all-orders.component.html',
  styleUrls: ['./see-all-orders.component.css']
})
export class SeeAllOrdersComponent implements OnInit {

  orderLenght = 0;
  orders = [];
  isHavenotOrder = true;
  errorMessage = '';
  errorMessageFromDelete = '';
  isLoading = true;

  constructor(
    private _orderService: OdersService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._orderService.getorders()
      .subscribe(
        result => {
          if (result.DataCount > 0) {
            this.isHavenotOrder = false;
          }
          this.orderLenght = result.DataCount;
          this.orders = result.orders;
          this.isLoading = false;
          console.log(this.orders);
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              this.errorMessage = error.error;
              this.isLoading = false;
              console.log(error.error);
            }
          }
        }

      );
  }
  selectOrder(event: any) {
    this._router.navigate(['/oders/', event]);
  }
  deleteOrder(event: any) {
    this._orderService.deleteOrder(event)
      .subscribe(
        result => {
          console.log(result.message);
          window.location.reload();
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
