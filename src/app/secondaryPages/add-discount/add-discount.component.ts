import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddDiscountComponent>) { }
discount: any
  ngOnInit(): void {
  }
  // get discount the value and type
getDiscount(group){
  console.log(this.discount)
console.log(group)
this.dialogRef.close({ grp:group,discount:this.discount})
}
// close that dialog 
  closeDialog(){
    this.dialogRef.close()
  }

}
