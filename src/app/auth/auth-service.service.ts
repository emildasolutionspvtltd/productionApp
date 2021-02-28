import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { SecondaryService } from '../services/secondary.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private db: DatabaseService, private secService: SecondaryService) {
  }
  lisValid
  isRegister








  register(data){
  
     let date = new Date(Date.now())
     var year = date.getFullYear();
     var month = date.getMonth();
     var day = date.getDate();
     let expireDate =   new Date(year + 1, month, day);
    
    



    
  }

  public isAuthenticated(): boolean {

    return true
    // if(this.licenseValid()){
    //  this.secService.presentSanckBar('welcome ', 'sucess')
    //   return true
    // }
    // return false
  }


  public licenseValid(): boolean {
    return true
    // if(this.isRegistered()){
    //   this.db.getKey().then(x => {
    //     console.log(x.length)
    //     if (x.length > 0) {
    //       return true
    //     }
    //   })
    // }
    // return false
  }

  public  isRegistered():boolean{
    return true
    //  await this.db.isRegistered().then(x=>{


    // })

    // return false
  //   this.db.getUser().then(x => {
  //     console.log(x.length)
  //     if (x.length > 0) {
  //       return true
  //     }
  //   })
  //   return false
  }
}
