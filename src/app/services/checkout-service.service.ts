import { customer } from './types/customerType';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheckOutItemComponent } from '../secondaryPages/check-out-item/check-out-item.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DataSource } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {
  




   checkoutSettings={
     expressMode:true,
     askForPrintOption:true,
     defaultPrintOption:true
   }
  
  selectedCustomer: customer
  private bag = [];
  private cartItemCount = new BehaviorSubject(0);
  constructor(private matBottom: MatBottomSheet) { }




  setCustomer(data) {
    this.selectedCustomer = data
  }


  getCustomer() {
    return this.selectedCustomer
  }

  clearCustomer() {
    this.selectedCustomer = undefined
  }







 clearBag(){
   this.bag.length=0
 }


  getQuantity(item) {
    var line = this.bag.find(p => p.documentId === item.documentId)
    return line == undefined ? 0 : line.amount
  }




  get getBag(): Array<any> {
    return this.bag;
  }




  getCartItemCount() {
    return this.cartItemCount;
  }


  //addItem to the bag

  addItem(item) {
    let added = false;
    for (let p of this.bag) {
      if (p._id === item._id) {
        p.quantity += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      item.quantity = 1;
      this.bag.push(item);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }






  decreaseItem(item) {
    for (let [index, p] of this.bag.entries()) {
      if (p._id === item._id) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          this.bag.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }


  //remove item to bag

  removeItem(item) {
    for (let [index, p] of this.bag.entries()) {
      if (p._id === item._id) {
        this.cartItemCount.next(this.cartItemCount.value - p.quantity);
        this.bag.splice(index, 1);
        return this.bag
      }
    }
  }

}