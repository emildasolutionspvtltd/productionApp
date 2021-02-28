import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bag-notification',
  templateUrl: './bag-notification.component.html',
  styleUrls: ['./bag-notification.component.scss']
})
export class BagNotificationComponent implements OnInit {

  constructor(public matDialog:MatDialog ,private dialogRef:MatDialogRef<BagNotificationComponent>) { }



  closeDialog(){
    this.matDialog.closeAll()
  }


  response(data)

  {
    this.dialogRef.close(data)
  }

  ngOnInit(): void {
  }

}
