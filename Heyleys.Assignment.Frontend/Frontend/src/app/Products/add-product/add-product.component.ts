import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/Services/product.service';
import { inject } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(public service: ProductService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProductComponent>) { }

  ngOnInit(): void {
  }

 
  insertRecord(form: NgForm) {
    this.service.postProduct(form.value).subscribe(res => {
      this.dialogRef.close();
      this.toastr.success('Product Added successfully', 'MC Computers', {
        progressBar: true,
        positionClass: 'toast-top-right'
      });
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    if (confirm('Are you sure want to Update this Product record?')) {
      this.service.putProduct(form.value).subscribe(res => {
        this.toastr.info('Updated successfully', 'Product. Register',{
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
        productName : '',
        code : '',
        description : "",
        quantity : '',
        costPrice : '',
        sellingPrice : '',
        category:''
      }    
    }
  
}
