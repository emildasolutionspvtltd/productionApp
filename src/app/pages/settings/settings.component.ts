import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddPaymentComponent } from 'src/app/secondaryPages/add-payment/add-payment.component';

import { AddTaxesComponent } from 'src/app/secondaryPages/add-taxes/add-taxes.component';
import { EditPayComponent } from 'src/app/secondaryPages/edit-pay/edit-pay.component';
import { EditTaxComponent } from 'src/app/secondaryPages/edit-tax/edit-tax.component';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';

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
  // gets all the previous payment mode and taxes
  constructor(@Inject(SecondaryService) private secService:SecondaryService,private dialog:MatDialog,private db:DatabaseService) {
    this.getTax()
    this.getPay()
    this.getPrinter()
   }
   infoForm = new FormGroup({
     header : new FormControl('',Validators.required),
     footer : new FormControl('',Validators.required)
   })
   printerForm = new FormGroup({
    recieptPrinter: new FormControl('',Validators.required),
    labelPrinter: new FormControl('',Validators.required),
  });
  ngOnInit(): void {
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
  onSelectFile(event) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }
      }
  }

  // function to add header and footer
  addInfo(){
    console.log(this.infoForm)
  }
  getPrinter(){
    this.db.getPrinter().then(x=>{
      this.printerName = x
    })
  }
  delete(id){
    this.db.delete(id).then(x=>{
      console.log(x)
    })
    this.db.getTax()
    this.db.getPay()
  }
}
