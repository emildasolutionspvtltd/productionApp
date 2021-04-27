import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-edit-tax',
  templateUrl: './edit-tax.component.html',
  styleUrls: ['./edit-tax.component.scss']
})
export class EditTaxComponent implements OnInit {
  taxForm = new FormGroup({
    type: new FormControl('tax'),
    taxName : new FormControl('',Validators.required),
    taxPercentage: new FormControl('',Validators.required),
    inex: new FormControl('',Validators.required)
  })
  taxname
  taxpercentage
  Taxinex
  taxes
  constructor(private router :Router,private dialog:MatDialog,private db:DatabaseService, @Inject(SecondaryService) private secService: SecondaryService,@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
    this.db.getIndivisualTax(data).then(x=>{
      console.log(x)
      this.taxes =x[0]
      this.taxname = this.taxes.taxName
      this.taxpercentage = this.taxes.taxPercentage
      this.Taxinex = this.taxes.inex
    })
  }

  submit(){
    console.log(this.taxForm.value)
      if(this.taxForm.valid){
        this.db.updateTax(this.data,this.taxForm.value).then(x=>{
          console.log(x)
          this.closeDialog()
          this.secService.presentSanckBar("👍 Item Updated Successfully",'success')
        })
      }else{
        console.log("not working") 
      }
    }
  ngOnInit(): void {
  }
  closeDialog() {
    this.dialog.closeAll()
  }
}
