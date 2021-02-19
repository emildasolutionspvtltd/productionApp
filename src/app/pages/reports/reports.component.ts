import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SecondaryService } from 'src/app/services/secondary.service';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(@Inject(SecondaryService) private secService:SecondaryService) { }

  ngOnInit(): void {
  }
  reportForm = new FormGroup({
    type: new FormControl('',Validators.required),
    date: new FormControl('',Validators.required)
   
  });

  drawerToggle(){
    this.secService.toggle()
  }

  

}
