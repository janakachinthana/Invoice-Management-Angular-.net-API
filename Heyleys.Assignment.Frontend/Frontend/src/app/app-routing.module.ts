import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewInvoiceComponent } from './Invoices/view-invoice/view-invoice.component';
import { ViewProductComponent } from './Products/view-product/view-product.component';

const routes: Routes = [
  { path : '', component : HomeComponent } ,
  { path : 'product', component : ViewProductComponent } ,
  { path : 'invoice', component : ViewInvoiceComponent } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
