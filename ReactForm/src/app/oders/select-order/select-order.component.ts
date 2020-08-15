import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OdersService } from '../oders.service';

@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.css']
})
export class SelectOrderComponent implements OnInit {

  
  constructor( private _odersService: OdersService,
               private _router: Router ) { }

  ngOnInit(): void {
   

  }

}
