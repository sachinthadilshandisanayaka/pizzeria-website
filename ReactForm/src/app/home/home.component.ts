import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products = [];
  productCount = 0;
  public isNothaveProducts = true;
  isLoading = true;

  constructor(private _homeServie: HomeService,
    private _roter: Router) { }

  ngOnInit(): void {
    this._homeServie.getProducts()
      .subscribe(
        result => {
          this.products = result.products
          this.productCount = result.DataCount
          if (this.productCount > 0) {
            this.isNothaveProducts = false;
          }
          this.isLoading = false;
          console.log(this.products);
        },
        error => {
          this.isLoading = false;
          console.log(error);
        }
      )
  }
  showClickedProduct(event) {
    this._roter.navigate(['/products', event])
  }
  getOrder(event) {
    this._roter.navigate(['oders/buy/', event])
  }

}
