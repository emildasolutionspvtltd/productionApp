import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-accept-transaction',
  templateUrl: './accept-transaction.component.html',
  styleUrls: ['./accept-transaction.component.scss']
})
export class AcceptTransactionComponent implements OnInit {
  typesOfShoes: string[]
  otherData
  newData
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private secService: SecondaryService, private db: DatabaseService, public dialogRef: MatDialogRef<AcceptTransactionComponent>) {
    console.log(data)
    this.db.getTransac(data).then(x => {
      this.otherData = x[0]
      console.log(x)
      console.log(x[0].data)
      this.typesOfShoes = x[0].data
    })
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close()
  }
  current_selected
  totalPrice = 0
  onSelection(e, v) {
    console.log(v)
    this.current_selected = e.option.value.price;
    this.totalPrice = this.totalPrice + this.current_selected
    console.log(this.current_selected)
  }
  selectedOptions = [];
  selectedOption;

  onNgModelChange($event) {
    this.current_selected = this.selectedOptions
    this.selectedOption = $event
    console.log(this.selectedOption)
    this.calculatePrice(this.selectedOption)
  }
  calculatePrice(data) {
    this.totalPrice = 0
    for (var index in data) {
      console.log(data[index].price)
      this.totalPrice = this.totalPrice + data[index].price
    }
  }
  submit() {
    if (this.selectedOptions.length == 0) {
      this.secService.presentSanckBar('please select one', 'ok')
    }
    else {
      console.log(this.selectedOptions)
      
      for (var index in this.selectedOptions) {
        // update inventory
         this.db.updateInventory(this.selectedOptions[index]._id, this.selectedOptions[index].inventory + this.selectedOptions[index].quantity).then(x => {
           console.log(x)
           this.updateFunction(x[0]._id,x[0].inventory,this.selectedOptions[index].quantity)
         })
      }
      this.addToDb()
    }

  }

updateFunction(id,inv,quan){
  console.log(id,inv,quan)
  this.db.increaseInventory(id,inv+quan).then(x=>{
    console.log(x)
  }) 
  }
  addToDb(){
    console.log(this.otherData.data)
    let dateTime = new Date()
    this.newData = {time : dateTime, type : this.otherData.type,paymentType :this.otherData.paymentType,discount: this.otherData.discount,customer: this.otherData.customer, total :this.totalPrice,data:this.selectedOptions,typeOfTransaction : 'return'}
    this.db.addTransaction(this.newData).then(x=>{
console.log(x)
    }).catch(err=>{
      console.log(err)
    })
  }
}

