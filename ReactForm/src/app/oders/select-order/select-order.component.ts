import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OdersService } from '../oders.service';

@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.css']
})
export class SelectOrderComponent implements OnInit {

  orderId: any;
  selectOrder: any;
  errorMessage = '';

  constructor(private _odersService: OdersService,
    private _router: Router, private route: ActivatedRoute) { }

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

}
