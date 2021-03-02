import { SecondaryService } from './../../services/secondary.service';
import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CheckoutServiceService } from 'src/app/services/checkout-service.service';
import { MatDialog } from '@angular/material/dialog';
import { BagNotificationComponent } from 'src/app/secondaryPages/bag-notification/bag-notification.component';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-dashboard-side-menu',
  templateUrl: './dashboard-side-menu.component.html',
  styleUrls: ['./dashboard-side-menu.component.scss']
})
export class DashboardSideMenuComponent implements AfterViewInit {
  @ViewChild('drawer') public drawer: MatDrawer;
bag =[]
  constructor(private auth : AuthServiceService,private cs:CheckoutServiceService, private dialog : MatDialog, private router:Router,   @Inject(SecondaryService) private secService:SecondaryService) {
this.bag=this.cs.getBag
   }

   routersCall(paths){
     this.secService.toggle()
     if(this.bag.length == 0 ){
      this.router.navigate([paths])


     }
     else{

      const dialogRef = this.dialog.open(BagNotificationComponent, {
        maxWidth: '450px',
        width: '90%',
        panelClass: 'dialogCss'
      
      })
  
      dialogRef.afterClosed().subscribe(result=>{
  if(result == 'clear')

{
  this.cs.clearBag()
  this.router.navigate([paths])
  

}else{



}

      }
      )
      
     }
   }




   acitiveCheck() {
     return this.router.url
   }

   ngAfterViewInit(){
   this.secService.setDrawer(this.drawer)
   }


  logout(){

    this.auth.loggedIn=false
    this.router.navigate(['login'])
    this.secService.presentSanckBar("You Logged Out",'success')
  }

  
  }
 