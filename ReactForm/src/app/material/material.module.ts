import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list'; 

const MaterialComponents = [
  MatGridListModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
