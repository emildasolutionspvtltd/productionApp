import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { type } from 'os';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';
import { DatePipe } from '@angular/common';

let recieptPrint = [
 
];

@Component({
  selector: 'app-display-checkout',
  templateUrl: './display-checkout.component.html',
  styleUrls: ['./display-checkout.component.scss']
})
export class DisplayCheckoutComponent implements OnInit {
  consoleData: any
  headerfooter
  printerinfo
  things: any[]
  secondArray: string[][] = []
  constructor(private db: DatabaseService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DisplayCheckoutComponent>, private dialog: MatDialog, private secService: SecondaryService) {
    console.log(data.data)
    console.log(data.pay)
    console.log(data.total)
    console.log(data.discount)
    console.log(data.customer)




    this.db.getEnteredPrinter().then(x => {
      this.printerinfo = x[0]
    })
    this.db.getEnterheadFoot().then(x => {
      this.headerfooter = x[0]
    })
    this.things = [];
    this.secondArray = [];
  }

  ngOnInit(): void {
  }









  // function to get whether success or failure 
  // this will be replaced by actual payment module that will send a tranction id 
  checkout(group) {
    console.log(group)

    for (var index in this.data.data) {
    //update inventory
    this.db.updateInventory(this.data.data[index].id, this.data.data[index].inventory - this.data.data[index].quantity).then(x => {
      console.log('sucess')
      
    })
  }


    //writting in the database
    let dateTime = new Date()
        console.log(dateTime)
        this.consoleData = {
          type: 'transaction', data: this.data.data, paymentType: this.data.pay, total: this.data.total, discount: this.data.discount,tax:this.data.tax,subTotal:this.data.subTotal, time: dateTime, customer: this.data.customer,typeOfTransaction : 'sale'
        }

    
  
    this.db.addTransaction(this.consoleData).then(x => {
      console.log(x)
    })


    if (group == "print") {
 

        this.printData()
        this.secService.presentSanckBar('Transaction SucessFul', 'success')
        console.log('close')
        this.dialogRef.close('success')
      
    }
    else {

      this.dialogRef.close('success')
      console.log('close')

      this.secService.presentSanckBar('Transaction SucessFul', 'success')
    }
  }


  // function to close dialog
  closeDialog() {
    this.dialogRef.close()
  }










  // function to print data
  printData() {
    for (var index in this.data.data) {
      let Temp: Array<any>

      Temp = [
        this.data.data[index].name.toUpperCase()+"/"+this.data.data[index].nameInArabic , this.data.data[index].quantity, this.data.data[index].price, (this.data.data[index].price*this.data.data[index].quantity)]
      this.things.push(Temp)
    }


    console.log(this.things)
    let newDate = new Date().toDateString()
    let a: string[][] = ['']['']




    recieptPrint = [
      {
        type: 'text', value: 'test', style: `text-align:center;`

      }, {
        type: 'table',

        style: 'border: 0px',
        tableHeader: [],
        tableBody: [
          ['Customer Name', this.consoleData.customer.name.toUpperCase()],
          ['Date', newDate],
          ['Payment Type', this.consoleData.paymentType]
        ],
        tableFooter: [],
        tableBodyStyle: 'border: 0px',

      },

      {
        type: 'table',

        style: 'border: 1px solid #ddd',
        tableHeader: ['Item Name', 'Qty', 'Net','Total'],
        tableBody: this.things
        ,
        tableFooter: ['description', 'Qty', 'total', 'net'],
        tableBodyStyle: 'border: 1px solid #ddd',

      },

      {
        type: 'table',

        style: 'border: 0px',
        tableHeader: [],
        tableBody: [
          ['Tax', this.consoleData.tax],

          ['Sub Total', this.consoleData.subTotal],

          ['Dicount', this.consoleData.discount],
          ['Grand Total',this.consoleData.total]
         ,
          []
        ],
        tableFooter: [],
        tableBodyStyle: 'border: 0px,display: none',

      },
      {
        type: 'text', value: 'no ides=a', style: `text-align:center;`

      }
    ];
    console.log(recieptPrint)
    this.db.printData(recieptPrint)
   }
}
