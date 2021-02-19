import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SecondaryService {

  private drawer:MatDrawer
  constructor(private snackBar:MatSnackBar) { }




  setDrawer(drawer:MatDrawer){
    console.log("drawer Came")
    console.log(drawer)
    this.drawer = drawer
  }



  presentSanckBar(message,mode){

    return mode == 'success'?this.snackBar.open(message,'Ok',{
      duration:2000,
      panelClass:'successPanel'
    }):this.snackBar.open(message,'Ok',{
      duration:2000,
      panelClass:'dangerPanel'
    })
    


  }



  toggle() : void{
    console.log("trying to loggle")
    this.drawer.toggle()
  }



  





}
