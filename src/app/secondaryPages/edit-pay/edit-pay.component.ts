import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-edit-pay',
  templateUrl: './edit-pay.component.html',
  styleUrls: ['./edit-pay.component.scss']
})
export class EditPayComponent implements OnInit {
payment
payForm = new FormGroup({
  type: new FormControl('payment'),
  paymentName : new FormControl('',Validators.required),
  notes: new FormControl('',Validators.required),
})
payName
Paynote
  constructor(private router :Router,private dialog:MatDialog,private db:DatabaseService, @Inject(SecondaryService) private secService: SecondaryService,@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.db.getindivisualPay(data).then(x=>{
      console.log(x)
      this.payment = x[0]
      this.payName = this.payment.paymentName
      this.Paynote = this.payment.notes
    })
  }
  submit(){
    console.log(this.payForm.value)
      if(this.payForm.valid){
        this.db.updatePay(this.data,this.payForm.value).then(x=>{
          console.log(x)
          this.secService.presentSanckBar("👍 Item Updated Successfully",'success')
        })
      }else{
        console.log("not working") 
      }
    }
  ngOnInit(): void {
  }
  closeDialog() {
    this.dialog.closeAll()
  }
}
