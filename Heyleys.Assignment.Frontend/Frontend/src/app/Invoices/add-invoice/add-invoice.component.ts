import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceProduct } from 'src/app/Models/invoice-product.model';
import { Product } from 'src/app/Models/product.model';
import { InvoiceProductService } from 'src/app/Services/invoice-product.service';
import { InvoiceService } from 'src/app/Services/invoice.service';
import { ProductService } from 'src/app/Services/product.service';
// import * as html2pdf  from 'html2pdf';
@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  selectedQuantity: any[] = [];
  product: Product = new Product;
  LineTotal: number = 0;
  discountedAmount: number = 0;
  date: Date = new Date();
  invoiceProduct: InvoiceProduct = new InvoiceProduct;
  TotalAmount: number = 0;

  constructor(public service: InvoiceService,
    public productService: ProductService,
    public invoiceProductService: InvoiceProductService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddInvoiceComponent>) { }

  ngOnInit(): void {
    this.productService.refreshList();
    if (this.productService.list.length == 0) {
      this.productService.list = []
    }

  }

  calcbalence(event: any) {
    this.service.formData.balance = event.value - this.discountedAmount
  }

  calcDiscount(event: any) {
    this.discountedAmount = this.service.formData.totalAmount - (this.service.formData.totalAmount * (event.value / 100));
    this.service.formData.discount = this.service.formData.totalAmount * (event.value / 100)
  }

  selectProduct(event: any) {
    console.log(event.target.value)
    for (let index = 0; index < this.productService.list.length; index++) {
      const element = this.productService.list[index];
      if (event.target.value == element.id) {
        this.service.selectedProducts.push(element);
        element.quantity = 0;
        this.service.selectedQuantityProducts.push(element);
      }
    }
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  selectQuantity(event: any) {

    this.TotalAmount = 0

    for (let index = 0; index < this.service.selectedQuantityProducts.length; index++) {

      const element = this.service.selectedQuantityProducts[index];

      if (event.name == element.id) {
        element.quantity = event.value;
      }

      this.LineTotal = (element.sellingPrice * element.quantity);
      this.TotalAmount = this.TotalAmount + this.LineTotal
    }

    this.service.formData.totalAmount = this.TotalAmount
    console.log(this.LineTotal)
  }

  public id: any = this.newGuid()

  insertRecord(form: NgForm) {
    form.value.id = this.id;

    this.service.postInvoice(form.value).subscribe(res => {
      this.dialogRef.close();
      this.toastr.success('Invoice Added successfully', 'MC Computers', {
        progressBar: true,
        positionClass: 'toast-top-right'
      });
      this.resetForm(form);
      this.service.refreshList();
    });

    for (let index = 0; index < this.service.selectedQuantityProducts.length; index++) {
      const element = this.service.selectedQuantityProducts[index];

      this.invoiceProduct.invoiceId = form.value.id;
      this.invoiceProduct.productId = element.id;
      this.invoiceProduct.quantity = element.quantity;
      this.invoiceProduct.lineTotal = element.quantity * element.sellingPrice;

      this.invoiceProductService.postInvoice(this.invoiceProduct).subscribe(res => {
        console.log(this.invoiceProduct);
        this.service.selectedQuantityProducts = [];
      });
    }
    this.downloadPDF();
  }

  updateRecord(form: NgForm) {
    if (confirm('Are you sure want to Update this Invoice record?')) {
      this.service.putInvoice(form.value).subscribe(res => {
        this.toastr.info('Updated successfully', 'Invoice. Register', {
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
        this.resetForm(form);
        this.service.refreshList();
        this.dialogRef.close();
      });

      for (let index = 0; index < this.service.selectedQuantityProducts.length; index++) {
        const element = this.service.selectedQuantityProducts[index];

        for (let index2 = 0; index < this.invoiceProductService.list.length; index2++) {
          const element2 = this.invoiceProductService.list[index];

          if (element.id == element2.productId && element2.invoiceId == form.value.id) {

            this.invoiceProduct.id = element2.id;
            this.invoiceProduct.invoiceId = form.value.id;
            this.invoiceProduct.productId = element.id;
            this.invoiceProduct.quantity = element.quantity;
            this.invoiceProduct.lineTotal = element.quantity * element.sellingPrice;

            this.invoiceProductService.putInvoice(this.invoiceProduct).subscribe(res => {
              console.log(this.invoiceProduct);
              this.service.selectedQuantityProducts = [];
            });


          }

        }

      }
    }
    else {
      this.dialogRef.close();
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      invoiceNumber: '',
      customerName: '',
      transactionDate: '',
      productId: '',
      discount: 0,
      quantity: '',
      totalAmount: '',
      balance: 0
    }
  }

  downloadPDF() {


    // const options = {
    //   filename : '( '+this.service.formData.customerName + +" - "+this.service.formData.id + ') Invoce Report',
    //   image: {type: 'jpeg', quality: 1 },
    //   html2canvas:  { scale : 5},
    //   margin : 10,
    //   jsPDF:{ format: 'a4', orientation: 'portrait',putOnlyUsedFonts:true}
    // };
    // var Element = document.getElementById('container');

    // html2pdf()
    //   .from(Element)
    //   .set(options)
    //   .save();

  }


}


