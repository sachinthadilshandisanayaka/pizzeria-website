import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  productCount = 0;
  public isNothaveProducts = true;
  constructor(private _produtsService: ProductsService,
    private _router: Router) { }

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
  updateProduct(event) {
    console.log(event);
    this._router.navigate(['products/update/id/', event]);
  }
  deleteProduct() {
    this._router.navigate(['']);
  }
}
