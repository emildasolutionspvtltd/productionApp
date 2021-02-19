import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss']
})
export class EditItemsComponent implements OnInit {

  constructor(private router :Router,private dialog:MatDialog,private db:DatabaseService, @Inject(SecondaryService) private secService: SecondaryService,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.getAllCategory()
    this.getInfo()
   }
   a :any
   itembarcode
   itemname
   itemarabic
   itemcat
   itemmrp
   itemprice
   itemtax
   iteminven
   itemunit
   categories
  itemForm = new FormGroup({
    type : new FormControl('items'),
    barcode: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    nameInArabic: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    mrp: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    tax: new FormControl('', Validators.required),
    inventory: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required)
  }) 
  
  ngOnInit(): void {
    console.log(this.data)
  }

  // funtion to get all data
  getAllCategory(){
    this.db.getAllCategory().then(allCategory=>{
      console.log(allCategory)
     this.categories=allCategory
    })
  }

  // gets the requires data from database
  getInfo(){
  
    console.log(this.data)
 
   this.db.getItem(this.data).then(x=>{
     console.log(x)
     this.a = x[0]
    this.itembarcode = this.a.barcode,
   this.itemname = this.a.name,
   this.itemarabic = this.a.nameInArabic,
   this.itemcat  = this.a.category
   this.itemmrp = this.a.mrp,
   this.itemprice = this.a.price,
   this.itemtax = this.a.tax
   this.iteminven = this.a.inventory
   this.itemunit = this.a.unit
     //this.secService.presentSanckBar("👍 Category updated Successfully",'success')
    console.log(this.a)

   }).catch(error=>{
     console.log(Error)
   })
 

}

 closeDialog() {
   this.dialog.closeAll()
 }

 // funciton to validate and update items
 submit(){
console.log(this.itemForm.value)
  if(this.itemForm.valid){
    this.db.updateitem(this.data,this.itemForm.value).then(x=>{
      console.log(x)
      this.secService.presentSanckBar("👍 Item Updated Successfully",'success')
    })
  }else{
    console.log("not working") 
  }
}

}
