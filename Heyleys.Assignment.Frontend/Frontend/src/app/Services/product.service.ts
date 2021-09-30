import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  date: Date = new Date();
  formData: Product = new Product;
  list: Product[] = [];
  readonly rootURL = "https://localhost:44348/api/Products"
  
  constructor(private http : HttpClient) { }
  
    newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  postProduct(formData : Product){
    console.log(formData.quantity + "quantity eka");
    const x ={
      "id": this.newGuid(),
      "creationTime": this.date,
      "creatorUserId": 0,
      "lastModificationTime": null,
      "lastModifierUserId": null,
      "isDeleted": false,
      "deleterUserId": null,
      "deletionTime": null,
      "code": formData.code,
      "productName": formData.productName,
      "category": formData.category,
      "description": formData.description,
      "costPrice": formData.costPrice,
      "sellingPrice": formData.sellingPrice,
      "quantity": formData.quantity.toString()
    
  }
    return this.http.post(this.rootURL, x);
  }

  putProduct(formData : Product){
     const x ={
        "id": formData.id,
        "lastModificationTime": this.date,
        "lastModifierUserId": 0,
        "code": formData.code,
        "productName": formData.productName,
        "category": formData.category,
        "description": formData.description,
        "costPrice": formData.costPrice,
        "sellingPrice": formData.sellingPrice,
        "quantity": formData.quantity.toString()
      
    }
    return this.http.put(this.rootURL+'/'+formData.id, x)
  }

  deleteProduct(id : any){
    return this.http.delete(this.rootURL+'/'+id)
  }

  getProductById(id: any){
    return this.http.get(this.rootURL+'/'+id)
  }

  refreshList(){
    this.http.get(this.rootURL).toPromise().then(res => this.list = res as Product[])
    
  }
}
