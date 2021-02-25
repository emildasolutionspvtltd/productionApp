import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
  payForm = new FormGroup({
    type: new FormControl('payment'),
    paymentName : new FormControl('',Validators.required),
    notes: new FormControl(''),
  })
  constructor(private db : DatabaseService, private secService: SecondaryService,private dialog:MatDialog) { }

  ngOnInit(): void {
  }


  // funciton to close the dialog
  closeDialog() {
    this.dialog.closeAll()
  }

  // validate and enter the value to new payment mode
  submit(){
    if(this.payForm.valid){
      this.db.insertPay(this.payForm.value).then(x=>{
        console.log(x)
        this.secService.presentSanckBar("👍 Item added Successfully",'success')
      })
    }else{
      //toast service 
    }
  }
}

