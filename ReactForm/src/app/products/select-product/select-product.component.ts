import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css']
})
export class SelectProductComponent implements OnInit {
  name: any
  price:any
  id:any
  productImage;any
  constructor( private _rouer: Router,
               private _productService: ProductsService) { }

  ngOnInit(): void {
    this._productService.showSelectedProduct(localStorage.getItem('productId'))
    .subscribe(
      res => {
        console.log(res)
        this.name = res.product.name
        this.id = res.product._id
        this.price = res.product.price
        this.productImage = res.product.productImage
      },
      err => {
        console.log(err)
      }
    )
    
  }

}
