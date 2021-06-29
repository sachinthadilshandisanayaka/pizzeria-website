import { Component, OnInit } from '@angular/core';
import { OdersService } from './oders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css']
})
export class OdersComponent implements OnInit {
  hasClick = false;
  oders = [];
  selectItemMenu = [];

  productId = '';
  addUserdetail: FormGroup;
  isTypenotSelect = false;
  isDivveryNotSelect = false;
  isError = false;
  isUpload = false;
  errorCallback = ''
  constructor(private _oderservice: OdersService,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam.toString();
    console.log(this.productId);

    this.addUserdetail = this.fb.group({
      item_type: [''],
      productId: [this.productId],
      qauantity: ['', Validators.required],
      name: ['', Validators.required],
      emailAdress: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      subAddress: ['', Validators.required],
      postalcode: ['', Validators.required],
      pickupordelivery: [''],
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

  selectItem(event) {

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
            this.addUserdetail.reset();
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
