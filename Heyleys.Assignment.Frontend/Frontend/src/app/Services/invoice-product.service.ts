import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceProduct } from '../Models/invoice-product.model';
import { Invoice } from '../Models/invoice.model';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceProductService {
  invoiceProduct: InvoiceProduct = new InvoiceProduct;
  date: Date = new Date();
  formData: Invoice = new Invoice;
  list: InvoiceProduct[] = [];
  readonly rootURL = "https://localhost:44348/api/InvoiceProducts"

  constructor(private http: HttpClient) { }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  postInvoice(formData: InvoiceProduct) {
      
    const y = {
      "id": this.newGuid(),
      "creationTime": this.date,
      "creatorUserId": 0,
      "lastModificationTime": null,
      "lastModifierUserId": null,
      "isDeleted": false,
      "deleterUserId": null,
      "deletionTime": null,
      "invoiceId": formData.invoiceId,
      "productId": formData.productId,
      "quantity": formData.quantity,
      "lineTotal": formData.lineTotal
    }
    return this.http.post(this.rootURL, y);
  }

  putInvoice(formData: InvoiceProduct) {
    return this.http.put(this.rootURL + '/' + formData.id, formData)
  }

  deleteInvoice(id: any) {
    return this.http.delete(this.rootURL + '/' + id)
  }

  getInvoiceProductById(id: any) {
    this.http.get(this.rootURL + '/' + id).toPromise().then(res => this.invoiceProduct =res as InvoiceProduct);
    return this.invoiceProduct;
  }

  refreshList() {
    this.http.get(this.rootURL).toPromise().then(res => this.list = res as InvoiceProduct[])
  }
}
