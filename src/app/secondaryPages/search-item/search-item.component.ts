import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
language

searchTerm
searchResults=[]
  constructor(private trasnulateService: TranslateService  ,private dialogRef:MatDialogRef<SearchItemComponent>,   private dialog:MatDialog,private databaseService:DatabaseService) { 

  }

  ngOnInit(): void {
  }


  closeDialog(){
    this.dialog.closeAll()
  }


  onChangeSearch(term){
console.log(term)




if(  this.trasnulateService.getDefaultLang() == 'en'){
  this.databaseService.searchItem(term).then(result=>{
    console.log(result)
    this.searchResults = result
  })
}else{
  this.databaseService.searchItemArabic(term).then(result=>{
    console.log(result)
    this.searchResults = result
  })
}

    
    

  }


  selectedItem(item){
this.dialogRef.close({data:item})
  }

}
