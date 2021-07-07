import { Component, OnInit } from '@angular/core';
import { OdersService } from './oders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductsService } from '../products/products.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css']
})
export class OdersComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  hasClick = false;
  oders = [];
  selectItemMenu = [];
  productName: any;
  smallPrice: any;
  mediamPrice: any;
  largePrice: any;
  description: any;
  image: any;
  productId = '';
  addUserdetail: FormGroup;
  isTypenotSelect = false;
  isDivveryNotSelect = false;
  isError = false;
  isUpload = false;
  isLoading = true;
  errorCallback = '';
  errorMessage = '';
  priceCalculate = 0;

  constructor(private _oderservice: OdersService,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _productServeice: ProductsService,
  ) { }

  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam.toString();
    this._productServeice.showSelectedProduct(this.productId)
      .subscribe(
        res => {
          console.log(res);
          this.productName = res.product.name
          this.smallPrice = res.product.smallPrice
          this.mediamPrice = res.product.mediamPrice
          this.largePrice = res.product.largePrice
          this.image = 'http://localhost:3000/' + res.product.productImage
          this.description = res.product.description
          this.isLoading = false;
        }, err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.errorMessage = err.error;
              console.log(err.error);
            }
          }
          this.isLoading = false;
        }
      );

    this.addUserdetail = this.fb.group({
      item_type: ['', Validators.required],
      productId: [this.productId],
      qauantity: ['', [Validators.required]],
      name: ['', Validators.required],
      emailAdress: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      subAddress: ['', [Validators.required]],
      postalcode: ['', [Validators.required]],
      pickupordelivery: ['', Validators.required],
    });
  }

  get qauantity() {
    return this.addUserdetail.get('qauantity');
  }
  get name() {
    return this.addUserdetail.get('name');
  }
  get getEmailAdress() {
    return this.addUserdetail.get('emailAdress');
  }
  get telephone() {
    return this.addUserdetail.get('telephone');
  }
  get address() {
    return this.addUserdetail.get('address');
  }
  get subAddress() {
    return this.addUserdetail.get('subAddress');
  }
  get postalcode() {
    return this.addUserdetail.get('postalcode');
  }
  get pickupordelivery() {
    return this.addUserdetail.get('pickupordelivery');
  }
  get item_type() {
    return this.addUserdetail.get('item_type');
  }
  get price_using_type() {
    if (this.addUserdetail.value.item_type == "small") {
      this.priceCalculate = parseFloat(this.smallPrice);
      return this.smallPrice;
    } else if (this.addUserdetail.value.item_type == "medium") {
      this.priceCalculate = parseFloat(this.mediamPrice);
      return this.mediamPrice;
    } else if (this.addUserdetail.value.item_type == "large") {
      this.priceCalculate = parseFloat(this.largePrice);
      return this.largePrice;
    }
  }
  get calulate_price() {
    var calculatePrice = (this.priceCalculate * parseFloat(this.addUserdetail.value.qauantity));
    return calculatePrice;
  }

  onSubmit() {
    if (this.addUserdetail.value.pickupordelivery == '') {
      this.isDivveryNotSelect = true;
    }
    if (this.addUserdetail.value.item_type == '') {
      this.isTypenotSelect = true;
    } else {
      console.log(this.addUserdetail.value)
      this.isDivveryNotSelect = false;
      this.isTypenotSelect = false;
      this._oderservice.setOrder(this.addUserdetail.value)
        .subscribe(
          result => {
            console.log(result);
            window.location.reload();
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
    console.log(this.addUserdetail.value)
  }

}
