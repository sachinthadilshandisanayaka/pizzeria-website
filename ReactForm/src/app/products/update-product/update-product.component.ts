import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  name: any
  smallPrice: any
  mediamPrice: any
  largePrice: any
  id: any
  description: any
  image: any
  public productId: String
  errorMessage = ''
  updatedDetail = []

  addItemForm: FormGroup;
  isError = false;
  isUpload = false;
  errorCallback = ''

  constructor(private _rouer: Router,
    private _productService: ProductsService, private route: ActivatedRoute, private fb: FormBuilder,) { }

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
          this.image = 'http://localhost:3000/' + res.product.productImage
          this.description = res.product.description
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.errorMessage = err.error;
              console.log(err.error);
            }
          }
        }
      )
    this.addItemForm = this.fb.group({
      name: [''],
      smallPrice: [''],
      mediamPrice: [''],
      largePrice: [''],
      description: [''],
      // productImage: ['']
    });
  }
  onSubmit() {
    if (this.addItemForm.value.name != '') {
      this.updatedDetail.push({ "propName": "name", "value": this.addItemForm.value.name });
    }
    if (this.addItemForm.value.smallPrice != '') {
      this.updatedDetail.push({ "propName": "smallPrice", "value": this.addItemForm.value.smallPrice });
    }
    if (this.addItemForm.value.mediamPrice != '') {
      this.updatedDetail.push({ "propName": "mediamPrice", "value": this.addItemForm.value.mediamPrice });
    }
    if (this.addItemForm.value.largePrice != '') {
      this.updatedDetail.push({ "propName": "largePrice", "value": this.addItemForm.value.largePrice });
    }
    if (this.addItemForm.value.description != '') {
      this.updatedDetail.push({ "propName": "description", "value": this.addItemForm.value.description });
    }
    // if (this.addItemForm.value.productImage != '') {
    //   this.updatedDetail.push({ "propName": "productImage", "value": this.addItemForm.value.productImage });
    // }
    console.log(this.updatedDetail);
    if (this.updatedDetail.length > 0) {
      this._productService.patchProduct(this.updatedDetail, this.productId)
        .subscribe(
          res => {
            console.log(res.message);
            this.addItemForm.reset();
            this.isUpload = true;
            this.updatedDetail = [];
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 401) {
                console.log(err.error);
                this.isError = true;
                this.errorCallback = err.error;
              }
            }
            this.addItemForm.reset();
            this.updatedDetail = [];
            console.log('error');
            console.log(err.error);
          }
        )
    } else {
      console.log('not updated');
    }

  }

}
