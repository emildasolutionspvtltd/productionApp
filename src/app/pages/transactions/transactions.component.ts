import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AcceptTransactionComponent } from 'src/app/secondaryPages/accept-transaction/accept-transaction.component';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
// get all the transaction
  constructor(@Inject(SecondaryService) private secService:SecondaryService,private db:DatabaseService,private dialog: MatDialog) { 
   this.getTransaction()
  }
  displayedColumns: string[] = ['dateTime','orderId' ,'custid', 'cost','typetransaction','button'];
  dataSource:MatTableDataSource<any>
 
  ngOnInit(): void {
    
  }
// funciton to get the transaction
  getTransaction(){
    this.db.getTransaction().then(x=>{
      console.log(x)
      this.dataSource = new MatTableDataSource(x)
      this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort
      this.dataSource.sortingDataAccessor = (x, property) => {
        switch (property) {
           case 'dateTime': return x.dateTime;
           default: return x[property];
        }
      };
      
    })
  }
  // funciton to return a single item
  ReturnTransaction(id){
    console.log(id)
  }

  drawerToggle(){
    this.secService.toggle()
  }
  deleteTrans
  deleteTransaction(id){
    this.db.deleteTransaction(id).then(x=>{
      console.log(x)
      for (var index in x[0].data) {
       // update inventory
       let quan =x[0].data[index].quantity
        this.db.updateInventory(x[0].data[index]._id, x[0].data[index].inventory + x[0].data[index].quantity).then(x => {
          console.log(x)
          this.updateFunction(x[0]._id,x[0].inventory,quan)
          
        })
      }
      let dateTime = new Date()
     this.deleteTrans = {time : dateTime, type :x[0].type,paymentType :x[0].paymentType,discount: x[0].discount,customer: x[0].customer, total :x[0].total,data:x[0].data,typeOfTransaction : 'cancel transaction'}
     this.deleteTrans.time = dateTime
     this.db.addTransaction(this.deleteTrans).then(x=>{
       
       console.log(x)
     }).catch(err=>{
       console.log(err)
     })
      this.getTransaction()
    })
  }

  
  updateFunction(id,inv,quan){
    console.log(quan)
    console.log(id,inv+quan)
    this.db.increaseInventory(id,inv+quan).then(x=>{
      console.log(x)
    }) 
    }


  ChangeTransaction(id){
    console.log(id)
    const dialogRef = this.dialog.open(AcceptTransactionComponent,{
      maxWidth: '450px',
      width: '90%',
      panelClass: 'dialogCss',
      data:id
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getTransaction()
      console.log('The dialog was closed');
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
