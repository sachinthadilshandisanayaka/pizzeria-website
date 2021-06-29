import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addItemForm: FormGroup;
  isError = false;
  isUpload = false;
  errorCallback = ''
  constructor(private _router: Router,
    private _productService: ProductsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      name: ['', [Validators.required]],
      smallPrice: ['', [Validators.required]],
      mediamPrice: ['', [Validators.required]],
      largePrice: ['', [Validators.required]],
      description: ['', [Validators.required]],
      productImage: ['', [Validators.required]]
    });
  }
  get getitemname() {
    return this.addItemForm.get('name');
  }
  get getsmallPrice() {
    return this.addItemForm.get('smallPrice');
  }
  get getmediamPrice() {
    return this.addItemForm.get('mediamPrice');
  }
  get getlargePricee() {
    return this.addItemForm.get('largePrice');
  }
  get getdescription() {
    return this.addItemForm.get('description');
  }
  get getproductImage() {
    return this.addItemForm.get('productImage');
  }
  onSubmit() {

    console.log(this.addItemForm.value)
    this._productService.addProduct(this.addItemForm.value)
      .subscribe(
        res => {
          console.log(res.message);
          this.addItemForm.reset();
          this.isUpload = true;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              console.log(err.error);
              this.isError = true;
              this.errorCallback = err.error;
            }
          }
          console.log(err.error);
        }
      )

  }
}
