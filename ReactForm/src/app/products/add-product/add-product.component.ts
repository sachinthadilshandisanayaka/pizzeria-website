import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addItemForm: FormGroup;
  productImage: File = null;
  name = '';
  smallPrice = '';
  mediamPrice = '';
  largePrice = '';
  description = '';


  isError = false;
  isUpload = false;
  errorCallback = '';

  constructor(private _router: Router,
    private _productService: ProductsService,
    private fb: FormBuilder, private _location: Location,
  ) { }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      name: [null, [Validators.required]],
      smallPrice: [null, Validators.required],
      mediamPrice: [null, Validators.required],
      largePrice: [null, Validators.required],
      description: [null, Validators.required],
      productImage: [null, Validators.required]
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

  onSubmit() {

    console.log(this.addItemForm.value)
    this._productService.addProduct(this.addItemForm.value, this.addItemForm.get('productImage').value._files[0])
      .subscribe(
        res => {
          console.log(res.message);
          this.isUpload = true;
          window.location.reload();
          this._location.back();
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
