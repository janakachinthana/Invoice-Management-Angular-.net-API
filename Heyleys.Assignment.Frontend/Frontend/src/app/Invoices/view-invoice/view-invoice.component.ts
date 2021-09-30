import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Invoice } from 'src/app/Models/invoice.model';
import { InvoiceService } from 'src/app/Services/invoice.service';
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
    private dialog: MatDialog,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.service.refreshList();
    if (this.service.list.length == 0) {
      this.service.list = []
    }
  }

  AddInvoice() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '35%';
    dialogConfig.height = '70%';
    this.dialog.open(AddInvoiceComponent, dialogConfig);
  }

  EditInvoice(product: Invoice) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '35%';
    dialogConfig.height = '70%';
    dialogConfig.data = { product };
    this.dialog.open(AddInvoiceComponent, dialogConfig);
  }


  populateForm(product: Invoice) {
    this.service.formData = Object.assign({}, product);
    this.EditInvoice(product);
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

