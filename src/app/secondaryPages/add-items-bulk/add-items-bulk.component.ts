import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from '../../services/secondary.service';

@Component({
  selector: 'app-add-items-bulk',
  templateUrl: './add-items-bulk.component.html',
  styleUrls: ['./add-items-bulk.component.scss']
})
export class AddItemsBulkComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddItemsBulkComponent>,private dialog:MatDialog ,private db:DatabaseService,private secService:SecondaryService) { }

  ngOnInit(): void {
  }

  closeDialog(){
this.dialog.closeAll()
  }


  uploadFile(){
    this.db.bulkItemAdding().then(x=>{
      this.secService.presentSanckBar('Product Added Successful','success')

      this.dialogRef.close()

    })
    
  }

}
