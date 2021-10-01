import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {
  selectedValue: any;
  constructor(public service: InvoiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddInvoiceComponent>) { }

    ngOnInit(): void {
      this.service.refreshList();
      if (this.service.listInvoiceProuct.length == 0) {
        this.service.listInvoiceProuct = []
      }
    }
  selectProduct( ){
    alert(this.selectedValue)
  }
 
  insertRecord(form: NgForm) {
    this.service.postInvoice(form.value).subscribe(res => {
      this.dialogRef.close();
      this.toastr.success('Invoice Added successfully', 'MC Computers', {
        progressBar: true,
        positionClass: 'toast-top-right'
      });
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    if (confirm('Are you sure want to Update this Invoice record?')) {
      this.service.putInvoice(form.value).subscribe(res => {
        this.toastr.info('Updated successfully', 'Invoice. Register',{
          progressBar :true,
          positionClass:'toast-top-right',
          easing:'ease-in'
        });
        this.resetForm(form);
        this.service.refreshList();
        this.dialogRef.close();
      });
    }
    else {
      this.dialogRef.close();
    }
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.resetForm();
      this.service.formData ={ 
        id : null,
        invoiceNumber: '',
        customerName: '',
        transactionDate: '',
        productId: '',
        discount: '',
        quantity: '',
        totalAmount: '',
        balance: 0
      }    
    }
  
}

