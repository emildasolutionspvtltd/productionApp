import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {


  customerForm = new FormGroup({
    type: new FormControl('customer'),
    name:  new FormControl('',Validators.required),
    email:new FormControl('',[Validators.email]),
    phNumber: new FormControl('',[Validators.minLength(10)]),
    notes: new FormControl(''),
  })

  constructor(private dialogRef:MatDialogRef<AddCustomerComponent>,   private dialog:MatDialog,private db: DatabaseService,private secService:SecondaryService) { }

  ngOnInit(): void {
  }

// function to close the dialog
  closeDialog(){
    this.dialog.closeAll()
  }


  //function to validate and submit the form
  submit(){
if(this.customerForm.valid) {

  this.db.insertCustomer(this.customerForm.value).then(x=>{
    this.secService.presentSanckBar(' 👍 Customer Add SuccessFully','success')
    this.dialogRef.close(this.customerForm.value)

    this.customerForm.reset()
    
  })
 
}else{
//toast

this.secService.presentSanckBar('👮 Please fill the Name field atlest to submit','danger')
} }
  

}
