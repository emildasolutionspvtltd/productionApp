import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {



  increaseInv =  new FormGroup({
    quantityNumber: new FormControl('',Validators.required)
  })



  constructor(private sec :SecondaryService,@Inject(MAT_DIALOG_DATA) public unit: any,private dialog:MatDialog,private dialogRef:MatDialogRef<AddInventoryComponent>) { }

  ngOnInit(): void {
  }


  addInventory(){
    if(this.increaseInv.valid){
      this.dialogRef.close(this.increaseInv.value.quantityNumber)
    }else{
      this.sec.presentSanckBar("Please Enter a valid input",'Danger')
    }
   
  }


  closeDialog(){

    this.dialog.closeAll()

  }

}
