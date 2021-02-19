import { AddItemsCategoryComponent } from './../add-items-category/add-items-category.component';
import { AddSingleItemComponent } from './../add-single-item/add-single-item.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemsBulkComponent } from '../add-items-bulk/add-items-bulk.component';

@Component({
  selector: 'app-add-item-option',
  templateUrl: './add-item-option.component.html',
  styleUrls: ['./add-item-option.component.scss']
})
export class AddItemOptionComponent implements OnInit {

  constructor(private dialog:MatDialog,private bottom:MatBottomSheet) { }

  ngOnInit(): void {
  }


  async routeToSingle(){

    //try
    await this.bottom.dismiss()

    await this.dialog.open(AddSingleItemComponent,{
      maxWidth:'450px',
      width:'90%',
      panelClass:'dialogCss'
    })

  }
  async routeToBulk(){
    await this.bottom.dismiss()

    await this.dialog.open(AddItemsBulkComponent)


  }
  async routeToCategory(){
    await this.bottom.dismiss()

    await this.dialog.open(AddItemsCategoryComponent)

  }


}
