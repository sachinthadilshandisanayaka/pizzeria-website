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
  productCount: any;
  // setimgURL= [];
  // getimgURL= [];

  constructor( private _produtsService: ProductsService,
               private _router: Router ) { }

  ngOnInit(): void {
    this._produtsService.showProducts()
    .subscribe(
      res => {
        this.products = res.products
        this.productCount = res.DataCount
        // this.setimgURL = res.products.productImage
        console.log(this.products)
      },
      err => {
        console.log(err)
      }
    )
  }

}
