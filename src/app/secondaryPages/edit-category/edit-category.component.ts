import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  constructor(private router :Router,private dialog:MatDialog,private db:DatabaseService, @Inject(SecondaryService) private secService: SecondaryService,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.getInfo()
   }
   catname : any
  a : any
   categoryName= new FormControl('',Validators.required)
  ngOnInit(): void {
  }

  //funciton to close dialog
  closeDialog(){
    this.router.navigate(['items'])
    this.dialog.closeAll()
   
  }


  //funciton to get all info 
getInfo(){
  
    console.log(this.data)
 
   this.db.getCategory(this.data).then(x=>{
     console.log(x)

     //this.secService.presentSanckBar("👍 Category updated Successfully",'success')
     this.a = x[0]
     this.catname = this.a.categoryName
     console.log(this.a.type)

   }).catch(error=>{
     console.log(Error)
   })
 

}
// funciton to validate and update the category
  submit(){
    if(this.categoryName.valid){
      this.db.updateCategory(this.data,this.categoryName.value).then(x=>{
        console.log(x)
        this.secService.presentSanckBar("👍 Category updated Successfully",'success')
       this.db.getAllCategory()
       this.db.getAllItems()
  
      })
    }else{
  
      this.secService.presentSanckBar("👮🏻  Please fill valid input",'danger')
      
    }  
    
  
  
    }
}
