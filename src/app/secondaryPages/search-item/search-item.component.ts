import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {


searchTerm
searchResults=[]
  constructor(private dialogRef:MatDialogRef<SearchItemComponent>,   private dialog:MatDialog,private databaseService:DatabaseService) { }

  ngOnInit(): void {
  }


  closeDialog(){
    this.dialog.closeAll()
  }


  onChangeSearch(term){
console.log(term)

    this.databaseService.searchItem(term).then(result=>{
      console.log(result)
      this.searchResults = result
    })
    

  }


  selectedItem(item){
this.dialogRef.close({data:item})
  }

}
