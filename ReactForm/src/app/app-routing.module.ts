import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { OdersComponent } from './oders/oders.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'sign-up', component: SignupComponent, pathMatch: 'full' },
  { path: 'sign-in', component: SigninComponent, pathMatch: 'full' },
  { path: 'oders', component: OdersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'oders/:', component: OdersComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'products' , component: ProductsComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }