import { customer } from './types/customerType';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {
  
  selectedCustomer:customer
  constructor() { }




  setCustomer(data){
    this.selectedCustomer = data
  }


  getCustomer(){
    return this.selectedCustomer
  }

  clearCustomer(){
    this.selectedCustomer=undefined
  }
}
