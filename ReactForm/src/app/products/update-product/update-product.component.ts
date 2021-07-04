import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public productId: String;
  errorMessage = '';
  errorCallback = '';
  updatedDetail = [];
  matcher = new MyErrorStateMatcher();
  addItemForm: FormGroup;
  isError = false;
  isUpload = false;
  isLoadingResults = false;
  getItemname = '';
  getItemSmallPrice: any;
  getItemMediumPrice: any;
  getItemLargePrice: any;
  gettemDescription = '';

  constructor(private _rouer: Router,
    private _productService: ProductsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      name: [''],
      smallPrice: [''],
      mediamPrice: [''],
      largePrice: [''],
      description: [''],
    });
    let idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam.toString();
    this._productService.showSelectedProduct(this.productId)
      .subscribe(
        res => {
          console.log(res)
          this.getItemname = res.product.name;
          this.getItemSmallPrice = res.product.smallPrice;
          this.getItemMediumPrice = res.product.mediamPrice;
          this.getItemLargePrice = res.product.largePrice;
          this.gettemDescription = res.product.description;
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
  }
  onSubmit() {
    console.log(this.addItemForm.value);
    if (this.addItemForm.value.name != "") {
      this.updatedDetail.push({ "propName": "name", "value": this.addItemForm.value.name });
    }
    if (this.addItemForm.value.smallPrice != "") {
      this.updatedDetail.push({ "propName": "smallPrice", "value": this.addItemForm.value.smallPrice });
    }
    if (this.addItemForm.value.mediamPrice != "") {
      this.updatedDetail.push({ "propName": "mediamPrice", "value": this.addItemForm.value.mediamPrice });
    }
    if (this.addItemForm.value.largePrice != "") {
      this.updatedDetail.push({ "propName": "largePrice", "value": this.addItemForm.value.largePrice });
    }
    if (this.addItemForm.value.description != "") {
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
