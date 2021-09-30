import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { ProductService } from 'src/app/Services/product.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html'
})
export class ViewProductComponent implements OnInit {

  searchText: string = "";
  isShow: boolean = true;
  topPosToStartShowing = 100;
  pageActual: number = 1;
  
  constructor(
    public service : ProductService,
    private dialog : MatDialog,
    private toastr : ToastrService,) { }

  ngOnInit(): void {
    this.service.refreshList();
    // if(this.service.list.length == 0){
    //   this.service.list = []
    // // }
    // console.log(this.service.list.length );
    // console.log("test");
  }

  AddProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '35%';
    dialogConfig.height = '70%';
    this.dialog.open(AddProductComponent, dialogConfig);
  }

  EditProduct(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '35%';
    dialogConfig.height = '70%';
    dialogConfig.data = {product};
    this.dialog.open(AddProductComponent, dialogConfig);
  }
  
  
  populateForm(product : Product){
    this.service.formData = Object.assign({}, product);
    this.EditProduct(product); 
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this Product record?')){
      this.service.deleteProduct(id).subscribe(res=>{
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', ' Elephas vacations',{
          progressBar :true,
          positionClass:'toast-top-right',
          easing:'ease-in'
        });  
      });
    }
  }
}
