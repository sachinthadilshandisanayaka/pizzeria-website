import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { OdersComponent } from './oders/oders.component';
import { SelectOrderComponent } from './oders/select-order/select-order.component'
import { ProductsComponent } from './products/products.component';
import { SelectProductComponent } from './products/select-product/select-product.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignupComponent, pathMatch: 'full' },
  { path: 'sign-in', component: SigninComponent, pathMatch: 'full' },
  { path: 'oders', component: OdersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'oders/:orderId', component: SelectOrderComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'products/selected', component: SelectProductComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'products/add-item', component: AddProductComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }