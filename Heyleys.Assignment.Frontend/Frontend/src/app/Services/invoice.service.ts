import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceProduct } from '../Models/invoice-product.model';
import { Invoice } from '../Models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  date: Date = new Date();
  formData: Invoice = new Invoice;
  list: Invoice[] = [];
  listInvoiceProuct: InvoiceProduct[] = [];
  readonly rootURL = "https://localhost:44348/api"

  constructor(private http: HttpClient) { }


  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  postInvoice(formData: Invoice) {
    console.log(formData);
    const x = {
      "id": this.newGuid(),
      "creationTime": this.date,
      "creatorUserId": 0,
      "lastModificationTime": null,
      "lastModifierUserId": null,
      "isDeleted": false,
      "deleterUserId": null,
      "deletionTime": null,
      "invoiceNumber": formData.invoiceNumber,
      "customerName": formData.customerName,
      "transactionDate": formData.transactionDate,
      "productId": formData.productId,
      "discount": formData.discount,
      "quantity": formData.quantity,
      "totalAmount": formData.totalAmount,
      "balance": formData.balance

    }
    return this.http.post(this.rootURL, x);
  }

  putInvoice(formData: Invoice) {
    console.log(formData);
    
    const x = {
      "id": formData.id,
      "lastModificationTime": this.date,
      "lastModifierUserId": 0,
      "invoiceNumber": formData.invoiceNumber,
      "customerName": formData.customerName,
      "transactionDate": formData.transactionDate,
      "productId": formData.productId,
      "discount": formData.discount,
      "quantity": formData.quantity,
      "totalAmount": formData.totalAmount,
      "balance": formData.balance
     
    }
    return this.http.put(this.rootURL + '/Invoices/' + formData.id, x)
  }

  deleteInvoice(id: any) {
    return this.http.delete(this.rootURL + '/Invoices/' + id)
  }

  getInvoiceById(id: any) {
    return this.http.get(this.rootURL + '/Invoices/' + id)
  }

  refreshList() {
    this.http.get(this.rootURL+'/Invoices').toPromise().then(res => this.list = res as Invoice[])
    this.http.get(this.rootURL+'/InvoiceProducts').toPromise().then(res => this.listInvoiceProuct = res as InvoiceProduct[])
  }
}
