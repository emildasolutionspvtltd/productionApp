import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
a : any
custName
custEmail
custPhone
CustNotes
  constructor(private db: DatabaseService,@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,private secService : SecondaryService) { 
    this.getInfo()
  }
  customerForm = new FormGroup({
    type: new FormControl('customer'),
    name:  new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    phNumber: new FormControl('',[Validators.required,Validators.minLength(10)]),
    notes: new FormControl(''),
  })
  ngOnInit(): void {
  }
  closeDialog(){

    this.dialog.closeAll()
   
  }


  // get all the required data from the database
  getInfo(){
  
    console.log(this.data)
 
   this.db.getCus(this.data).then(x=>{
     console.log(x)
     this.a = x[0]
     this.custName = this.a.name
     this.custEmail = this.a.email
     this.custPhone = this.a.phNumber
     this.CustNotes = this.a.notes
     //this.secService.presentSanckBar("👍 Category updated Successfully",'success')
    console.log(this.a)

   }).catch(error=>{
     console.log(Error)
   })
 

}
// funtion to validate and update customers
submit(){
  console.log(this.customerForm.value)
    if(this.customerForm.valid){
      this.db.updateCust(this.data,this.customerForm.value).then(x=>{
       
        this.closeDialog()
        this.secService.presentSanckBar("👍 Item Updated Successfully",'success')
      }).catch(err=>{
        this.secService.presentSanckBar(err,'Ok')
      })
    }else{
      this.secService.presentSanckBar("Enter correct Values",'Ok')
    }
  }
}
