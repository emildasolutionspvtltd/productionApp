import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  discount: number = 0;

  constructor(public dialogRef: MatDialogRef<AddDiscountComponent>,public secService:SecondaryService) { }
  ngOnInit(): void {
  }
  // get discount the value and type
getDiscount(group){
 if(this.discount != 0 ){
  this.dialogRef.close({ grp:group,discount:this.discount})

 }else{
   this.secService.presentSanckBar('Your Discount field has a invalid input','danger')
 }
}

// close that dialog 
  closeDialog(){
    this.dialogRef.close()
  }

}
