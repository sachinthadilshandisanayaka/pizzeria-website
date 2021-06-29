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
          console.log('hello');
          console.log(this.orderLenght);
        },
        error => {
          console.log(error);
        }
      )
  }
}
