import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
];
