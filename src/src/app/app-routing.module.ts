import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './UI/aboutus.component';
import { HomeComponent } from './UI/home.component';
import { ContactusComponent } from './UI/contactus.component';
import { SignupComponent } from './UI/auth/signup.component';
import { LoginComponent } from './UI/auth/login.component';
import { AdComponent } from './UI/context/ad.component';
import { AdviewComponent } from './UI/context/adview.component';
import { AddisplayComponent } from './UI/context/addisplay.component';
import { InvoiceviewComponent } from './UI/context/invoiceview.component';
import { InvoiceComponent } from './UI/context/invoice.component';
import { InvoicedisplayComponent } from './UI/context/invoicedisplay.component';
import { RevenueComponent } from './UI/context/revenue.component';

// firebase auth guard]
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'ad', component: AdComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'adview/:id', component: AdviewComponent },
  { path: 'ads/:id', component: AddisplayComponent },
  { path: 'invoice', component: InvoiceComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'invoiceview/:id', component: InvoiceviewComponent },
  { path: 'invoices/:id', component: InvoicedisplayComponent },
  { path: 'revenue', component: RevenueComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
