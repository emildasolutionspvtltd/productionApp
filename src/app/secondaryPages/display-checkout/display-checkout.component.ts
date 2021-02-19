import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { type } from 'os';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';
const data = [
  {
    type: 'text', value: 'hopefully it will work', style: `text-align:center;`
  }, {
    type: 'barCode',
    value: 'HB4587896',
    height: 12,                     // height of barcode, applicable only to bar and QR codes
    width: 1,                       // width of barcode, applicable only to bar and QR codes
    displayValue: true,             // Display value below barcode
    fontsize: 8,
  }, {
    type: 'qrCode',
    value: 'https://github.com/Hubertformin/electron-pos-printer',
    height: 55,
    width: 55,
    style: 'margin: 10 20px 20 20px'
  }
];

@Component({
  selector: 'app-display-checkout',
  templateUrl: './display-checkout.component.html',
  styleUrls: ['./display-checkout.component.scss']
})
export class DisplayCheckoutComponent implements OnInit {
  consoleData: any
  constructor(private db: DatabaseService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DisplayCheckoutComponent>, private dialog: MatDialog, private secService: SecondaryService) {
    console.log(data.data)
    console.log(data.pay)
    console.log(data.total)
    console.log(data.discount)
    console.log(data.customer)
  }

  ngOnInit(): void {
  }


  // function to get whether success or failure 
  // this will be replaced by actual payment module that will send a tranction id 
  outcome(group) {
    console.log(group)
    if (group == "sucess") {
      for (var index in this.data.data) {
        console.log(this.data.data[index].inventory)
        console.log(this.data.data[index].quantity)
        console.log(this.data.data[index].id)

        this.db.updateInventory(this.data.data[index].id, this.data.data[index].inventory - this.data.data[index].quantity).then(x => {
          console.log('sucess')
          this.printData()
          this.dialogRef.close()
        })
        let dateTime = new Date()
        console.log(dateTime)
        this.consoleData = {
          type: 'transaction', data: this.data.data, paymentType: this.data.pay, total: this.data.total, discount: this.data.discount, time: dateTime, customer: this.data.customer
        }
        this.db.addTransaction(this.consoleData).then(x => {
          console.log(x)
        })
      }
    }
    else {
      this.secService.presentSanckBar('please try again', 'ok')
    }
  }


  // function to close dialog
  closeDialog() {
    this.dialogRef.close()
  }


  // function to print data
  printData() {
    this.db.printData(data)
  }
}
