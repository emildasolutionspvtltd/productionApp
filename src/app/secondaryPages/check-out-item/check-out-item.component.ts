import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutServiceService } from 'src/app/services/checkout-service.service';

@Component({
  selector: 'app-check-out-item',
  templateUrl: './check-out-item.component.html',
  styleUrls: ['./check-out-item.component.scss']
})
export class CheckOutItemComponent implements OnInit {
  checkOutForm = new FormGroup({
    price: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    tax:new FormControl('')
  })
  tablePrice 
  tableQty

  constructor(private dialog:MatDialog,private bottom:MatBottomSheet,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private checkoutService : CheckoutServiceService) { 
    this.tablePrice = data.price
    this.tableQty = data.quantity
  }

  ngOnInit(): void {
  }

  // function to close dialog
  onclose(){
    this.bottom.dismiss()
  }
  // finction to validate and update the item
  update(){
    if(this.checkOutForm.valid){
      console.log(this.checkOutForm.value.price,this.checkOutForm.value.quantity,this.checkOutForm.value.tax)
      this.data.price = this.checkOutForm.value.price
      this.data.quantity = this.checkOutForm.value.quantity
      this.data.tax = this.checkOutForm.value.tax
    }
  }
updateData
  removeItem(){
    this.updateData=this.checkoutService.removeItem(this.data)
    this.bottom.dismiss(this.updateData)
  }
}
