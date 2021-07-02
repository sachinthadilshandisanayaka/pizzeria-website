import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OdersService } from '../oders/oders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  productCount = 0;
  errorMessageFromDelete = '';
  public isNothaveProducts = true;


  constructor(private _router: Router, private _produtsService: ProductsService) { }

  ngOnInit(): void {
    this._produtsService.showProducts()
      .subscribe(
        res => {
          this.products = res.products
          this.productCount = res.DataCount
          console.log(this.products)
          if (this.productCount > 0) {
            this.isNothaveProducts = false;
          }
        },
        err => {
          console.log(err)
        }
      )
  }
  addProduct() {
    this._router.navigate(['products/new/add-item']);
  }
  updateProduct(event: String) {
    console.log(event);
    this._router.navigate(['products/update/id/', event]);
  }

  deleteProduct(event: any) {
    this._produtsService.deleteProduct(event).subscribe(
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
