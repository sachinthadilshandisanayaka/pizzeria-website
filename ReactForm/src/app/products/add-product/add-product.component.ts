import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addItemForm: FormGroup;
  constructor( private _router: Router,
               private _productService: ProductsService,
               private fb: FormBuilder) { }

  ngOnInit(): void {
      this.addItemForm = this.fb.group({
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        productImage: ['', [Validators.required]]
      });
  }
  onSubmit() {
    console.log(this.addItemForm.value)
    this._productService.addProduct(this.addItemForm.value)
    .subscribe(
      res => {
        console.log(res.message);
      },
      err => {
        console.log(err.error);
      }
    )

  }
}
