import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { timeStamp } from 'node:console';
import { AddPaymentComponent } from 'src/app/secondaryPages/add-payment/add-payment.component';

import { AddTaxesComponent } from 'src/app/secondaryPages/add-taxes/add-taxes.component';
import { EditPayComponent } from 'src/app/secondaryPages/edit-pay/edit-pay.component';
import { EditTaxComponent } from 'src/app/secondaryPages/edit-tax/edit-tax.component';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';
import { isThisTypeNode } from 'typescript';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  displayedColumns: string[] = ['taxName', 'taxPercentage', 'inex', 'button'];
  dataSource:MatTableDataSource<any>
  dataSource1:MatTableDataSource<any>
  displayedColumns1: string[] = ['payName', 'paynotes','button'];
  printerName
  userInfo
  recieptPrinterData
  labelPrinterData
  headerFooterData
  // gets all the previous payment mode and taxes
  constructor(@Inject(SecondaryService) private secService:SecondaryService,private dialog:MatDialog,private db:DatabaseService) {
    this.getTax()
    this.getPay()
    this.getPrinter()
    this.getUserInfo()
    this.selectedPrinterInfo()
    this.getHeaderFooter()
   }
   infoForm = new FormGroup({
     type : new FormControl('printData'),
     header : new FormControl('',Validators.required),
     subHeader : new FormControl('',Validators.required),
     subFooter : new FormControl('',Validators.required),
     footer : new FormControl('',Validators.required)
   })



   printerForm = new FormGroup({
    type : new FormControl('recipetPrinter'),
    recieptPrinter: new FormControl('',Validators.required),
    width:new FormControl('',Validators.required)
  });


  labelForm = new FormGroup({
    type : new FormControl('labelPrinter'),
    labelPrinter: new FormControl('',Validators.required),
    width:new FormControl('',Validators.required)
  });
  ngOnInit(): void {
  }

selectedPrinterInfo(){
this.getReciptPrinter()
this.getLabelPrinter()
}


   getUserInfo(){
  this.db.isRegistered().then(result=>{
this.userInfo = result
  }  ).catch(error=>{
    this.secService.presentSanckBar(error,'danger')
  })
  }

// funciton to get al the taxes
  getTax(){
    this.db.getTax().then(x=>{
      console.log(x)
      this.dataSource = new MatTableDataSource(x)
    })
  }

  //function to get all the payment mode
  getPay(){
    this.db.getPay().then(x=>{
      console.log(x)
      this.dataSource1 = new MatTableDataSource(x)
    })
  }

  //function to add taxes
  addTax(){
    console.log()
     const dialogRef = this.dialog.open(AddTaxesComponent,{
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getTax()
      console.log('The dialog was closed');
    });
  }


  // function to add new payment mode
  addPayment(){
    console.log()
     const dialogRef = this.dialog.open(AddPaymentComponent,{
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getPay()
      console.log('The dialog was closed');
    });
  }
  editPayment(id){
    console.log(id)
     const dialogRef = this.dialog.open(EditPayComponent,{
      data: id
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getPay()
      console.log('The dialog was closed');
    });
  }
  editTax(id){
    console.log(id)
     const dialogRef = this.dialog.open(EditTaxComponent,{
       data: id
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getTax()
      console.log('The dialog was closed');
    });
  }
  drawerToggle(){
    this.secService.toggle()
  }


  // function to upload the logo image 
  url: any



  onSelectFile() { // called each time file input changes

this.db.logoImageOpen().then(x=>{

})
// console.log(event)

//       if (event.target.files && event.target.files[0]) {
//         var reader = new FileReader();

//         reader.readAsDataURL(event.target.files[0]); // read file as data url

//         reader.onload = (event) => { // called once readAsDataURL is completed
//           this.url = event.target.result;
          
        
//         }
//       }
  }

  getPrinter(){
    this.db.getPrinter().then(x=>{
      console.log(x)
      this.printerName = x
    })
  }
  delete(id){
    this.db.delete(id).then(x=>{
      console.log(x)
    })
    this.getTax()
    this.getPay()
  }
  addRecipetPrinter(){
    console.log(this.printerForm.value)

    if(this.printerForm.valid){
      this.db.addReceiptPrinter(this.printerForm.value).then(x=>{
       this.getReciptPrinter()
      })
    }
    else{
      this.secService.presentSanckBar('please enter correct values','ok')
    }
  }


  addLabelPrinter(){
    console.log(this.labelForm.value)
    if(this.labelForm.valid){
      this.db.addLabelPrinter(this.labelForm.value).then(x=>{
this.getLabelPrinter() 
     })
    }
    else{
      this.secService.presentSanckBar('please enter correct values','ok')
    }
  }


 

  addHeaderFooter(){
    if(this.infoForm.valid){
      this.db.addHeadFoot(this.infoForm.value).then(x=>{
 this.infoForm.reset()
 this.secService.presentSanckBar('Header Footer Data Updated','success')

       })
    }
    else{
      this.secService.presentSanckBar('please enter correct values','ok')
    }
  }







  

  getReciptPrinter(){
    this.db.getReceiptPrinter().then(result=>{
      this.recieptPrinterData =result
console.log(result)
    })
  }



  getLabelPrinter(){
    this.db.getLabelPrinter().then(result=>{
      this.labelPrinterData = result
      console.log(result)

    })  
  }

  getHeaderFooter(){
    this.db.getEnterheadFoot().then(result=>{
      this.headerFooterData=result
    })
  }



}
