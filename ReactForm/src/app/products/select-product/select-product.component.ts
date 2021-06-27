import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css']
})
export class SelectProductComponent implements OnInit {
  name: any
  smallPrice: any
  mediamPrice: any
  largePrice: any
  id: any
  description: any
  public productId: String;

  constructor(private _rouer: Router,
    private _productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam.toString();
    this._productService.showSelectedProduct(this.productId)
      .subscribe(
        res => {
          console.log(res)
          this.name = res.product.name
          this.id = res.product._id
          this.smallPrice = res.product.smallPrice
          this.mediamPrice = res.product.mediamPrice
          this.largePrice = res.product.largePrice
          this.description = res.product.description
        },
        err => {
          console.log(err)
        }
      )

  }

}
