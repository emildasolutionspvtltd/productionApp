import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SecondaryService } from 'src/app/services/secondary.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MatTableDataSource } from '@angular/material/table';
import { customer } from 'src/app/services/types/customerType';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddCustomerComponent } from 'src/app/secondaryPages/add-customer/add-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { EditCustomerComponent } from 'src/app/secondaryPages/edit-customer/edit-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
customers :Array<customer>=[]
dataStore : MatTableDataSource<customer>
  constructor(@Inject(SecondaryService) private secService:SecondaryService,private db: DatabaseService,private dialog : MatDialog) { 
   this.getCustomer()
  }
  displayedColumns: string[] = ['name', 'email', 'phNumber','notes','button'];
  ngOnInit(): void {
  }
// gets customers from the database
getCustomer(){
this.db.getCustomer().then(x=>{
  console.log(x)
this.customers = x
this.dataStore = new MatTableDataSource<customer>(this.customers) 
     this.dataStore.paginator = this.paginator;

})


}
// filters the tyoed result form table
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataStore.filter = filterValue.trim().toLowerCase();

  if (this.dataStore.paginator) {
    this.dataStore.paginator.firstPage();
  }
}


// triggers the addcustomer pop uo
addCustomer(){
  const dialogRef= this.dialog.open(AddCustomerComponent,{
    maxWidth:'450px'
    
    
  })
  dialogRef.afterClosed().subscribe(result => {
    this.getCustomer()
    console.log('The dialog was closed');
  });
}



//function to delete customer
deleteCustomer(id){
  this.db.deleteCust(id).then(x=>{
    this.secService.presentSanckBar("👍 Customer Deleted Successfully",'success')
    this.getCustomer()
  }).catch(err=>{
    console.log(err)
  })
}


//funciton to edit customer
editCustomer(id){
  console.log(id)
  const dialogRef = this.dialog.open(EditCustomerComponent,{
    maxWidth:'450px',
   data: id
 })
 dialogRef.afterClosed().subscribe(result => {
   this.getCustomer()
   console.log('The dialog was closed');
 });
}
  drawerToggle(){
    this.secService.toggle()
  }
}
