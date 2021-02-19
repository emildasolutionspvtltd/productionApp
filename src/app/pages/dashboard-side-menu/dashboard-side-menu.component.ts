import { SecondaryService } from './../../services/secondary.service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-side-menu',
  templateUrl: './dashboard-side-menu.component.html',
  styleUrls: ['./dashboard-side-menu.component.scss']
})
export class DashboardSideMenuComponent implements AfterViewInit {
  @ViewChild('drawer') public drawer: MatDrawer;

  constructor(private router:Router,   @Inject(SecondaryService) private secService:SecondaryService) {



   }

   routersCall(paths){
     this.secService.toggle()
     this.router.navigate([paths])
   }

   ngAfterViewInit(){
   this.secService.setDrawer(this.drawer)
   }

  
  }
 