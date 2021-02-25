import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { type } from 'os';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';
let recieptPrint = [
  {
    type: 'text', value: 'hopefully it will work', style: `text-align:center;`

  }, {
    type: 'table',

    style: 'border: 1px solid #ddd',
    tableHeader: ['description', 'Qty', 'total', 'net'],
    tableBody: [
      ['Cat', 2],
      ['Dog', 4],
      ['Horse', 12],
      ['Pig', 4],
    ],
    tableFooter: ['Animal', 'Age'],
    tableBodyStyle: 'border: 0.5px solid #ddd',

  }
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
    for (var index in this.data.data) {
      let Temp:Array<any>
      
      Temp = [
      this.data.data[index].name, this.data.data[index].quantity, this.data.data[index].mrp, this.data.data[index].total ]
      this.things.push(Temp)
    }


    console.log( this.things)
    let newDate = new Date().toDateString()
    let a: string[][] = ['']['']




    recieptPrint = [
      {
        type: 'text', value: this.headerfooter.header, style: `text-align:center;`

      }, {
        type: 'table',

        style: 'border: 0px',
        tableHeader: [],
        tableBody: [
          ['Name of customer', this.consoleData.customer.name],
          ['Date', newDate],
          ['Payment Type', this.consoleData.paymentType.paymentName]
        ],
        tableFooter: [],
        tableBodyStyle: 'border: 0px',

      },

      {
        type: 'table',

        style: 'border: 1px solid #ddd',
        tableHeader: ['description', 'Qty', 'total', 'net'],
        tableBody: this.things
        ,
        tableFooter: ['description', 'Qty', 'total', 'net'],
        tableBodyStyle: 'border: 0.5px solid #ddd',

      },

      {
        type: 'table',

        style: 'border: 0px',
        tableHeader: [],
        tableBody: [
          ['dicount', this.consoleData.discount],
          ['total', this.consoleData.total]
        ],
        tableFooter: [],
        tableBodyStyle: 'border: 0px,display: none',

      },
      {
        type: 'text', value: this.headerfooter.footer, style: `text-align:center;`

      }
    ];
    console.log(recieptPrint)
    this.db.printData(recieptPrint)
  }
}
