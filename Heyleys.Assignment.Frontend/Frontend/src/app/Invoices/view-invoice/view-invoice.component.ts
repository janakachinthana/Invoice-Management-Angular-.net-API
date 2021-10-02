import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceProduct } from 'src/app/Models/invoice-product.model';
import { Invoice } from 'src/app/Models/invoice.model';
import { InvoiceProductService } from 'src/app/Services/invoice-product.service';
import { InvoiceService } from 'src/app/Services/invoice.service';
import { ProductService } from 'src/app/Services/product.service';
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  searchText: string = "";
  isShow: boolean = true;
  topPosToStartShowing = 100;
  pageActual: number = 1;

  constructor(
    public service: InvoiceService,
    public productService: ProductService,
    public invoiceProductService: InvoiceProductService,
    private dialog: MatDialog,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
      this.service.list = []
    }
    this.invoiceProductService.refreshList();
    if (this.invoiceProductService.list.length == 0) {
      this.invoiceProductService.list = []
    }

    this.productService.refreshList();
    if (this.productService.list.length == 0) {
      this.productService.list = []
    }
  }

  AddInvoice() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '90%';
    this.dialog.open(AddInvoiceComponent, dialogConfig);
  }

  EditInvoice(invoice: Invoice) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '100%';
    dialogConfig.height = '90%';
    dialogConfig.data = { invoice };
    this.dialog.open(AddInvoiceComponent, dialogConfig);
  }


  populateForm(invoice: Invoice) {
    this.service.selectedProducts = [];
    this.service.formData = Object.assign({}, invoice);

    console.log(invoice.id)

    for (let index = 0; index < this.invoiceProductService.list.length; index++) {
      const element = this.invoiceProductService.list[index];
     
        
        if (element.invoiceId == invoice.id) {

          for (let index = 0; index < this.productService.list.length; index++) {
            const productElement = this.productService.list[index];

            if(element.productId == productElement.id){
              productElement.quantity = element.quantity
              this.service.selectedProducts.push(productElement);
              this.service.selectedQuantityProducts.push(productElement)
            }
          }
        }
      
     

    }
    console.log(this.service.selectedProducts)
    this.EditInvoice(invoice);
  }

  onDelete(id: any) {
    if (confirm('Are you sure to delete this Invoice record?')) {
      this.service.deleteInvoice(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'MC Computers', {
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      });
    }
  }
}

