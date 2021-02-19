import { Component, OnInit, Inject } from '@angular/core';
import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(@Inject(SecondaryService) private secService:SecondaryService) { }

  ngOnInit(): void {
  }


  drawerToggle(){
    this.secService.toggle()
  }

  

}
