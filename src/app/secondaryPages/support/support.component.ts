import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }



  closeDialog(){
    this.dialog.closeAll()

  }

}
