import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-add-taxes',
  templateUrl: './add-taxes.component.html',
  styleUrls: ['./add-taxes.component.scss']
})
export class AddTaxesComponent implements OnInit {

  constructor(private db : DatabaseService,private secService: SecondaryService,private dialog:MatDialog) { }
  taxForm = new FormGroup({
    type: new FormControl('tax'),
    taxName : new FormControl('',Validators.required),
    taxPercentage: new FormControl('',Validators.required),
    inex: new FormControl('',Validators.required)
  })
  ngOnInit(): void {
  }
  // finction to close dialog
  closeDialog() {
    this.dialog.closeAll()
  }

  // validate and submit types of taxes
  submit(){
    if(this.taxForm.valid){
      this.db.insertTax(this.taxForm.value).then(x=>{
        console.log(x)
        this.closeDialog()
        this.secService.presentSanckBar("👍 Item added Successfully",'success')
      })
    }else{
      //toast service 
    }
  }
  
  
}
