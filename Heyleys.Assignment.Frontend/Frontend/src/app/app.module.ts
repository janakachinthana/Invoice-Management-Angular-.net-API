import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './Products/add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { ViewProductComponent } from './Products/view-product/view-product.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { ViewInvoiceComponent } from './Invoices/view-invoice/view-invoice.component';
import { AddInvoiceComponent } from './Invoices/add-invoice/add-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    HomeComponent,
    ViewProductComponent,
    ViewInvoiceComponent,
    AddInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatDialogModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
