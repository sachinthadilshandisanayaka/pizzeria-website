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
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { SeeAllOrdersComponent } from './oders/see-all-orders/see-all-orders.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignupComponent, pathMatch: 'full' },
  { path: 'sign-in', component: SigninComponent, pathMatch: 'full' },
  { path: 'oders', component: SeeAllOrdersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'oders/buy/:id', component: OdersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'oders/:id', component: SelectOrderComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'products/:id', component: SelectProductComponent, pathMatch: 'full' },
  { path: 'products/new/add-item', component: AddProductComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'products/update/id/:id', component: UpdateProductComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }