import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SecondaryService } from 'src/app/services/secondary.service';
import { MatTableDataSource } from '@angular/material/table';
import { Items } from 'src/app/services/types/items';

@Component({
  selector: 'app-add-checkout',
  templateUrl: './add-checkout.component.html',
  styleUrls: ['./add-checkout.component.scss']
})
export class AddCheckoutComponent implements OnInit {
actualData : any
items:Array<Items>=[]
dataSource : MatTableDataSource<Items>
  constructor(public dialogRef: MatDialogRef<AddCheckoutComponent>,private db: DatabaseService,@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,private secService : SecondaryService) { 

    this.actualData = data.data
  }
  // displayedColumns: string[] = ['barcode', 'name', 'quantity','price','mrp', 'tax','button'];
  // adds items into the checkout table
  ngOnInit(): void {
    
 
  }


  selectedItem(item){

    console.log(item)
    this.dialogRef.close(item)

    
  }



  


  closeDialog() {
    this.dialog.closeAll()
  }

  addItems(){
    this.dataSource = this.actualData;
  }
}

