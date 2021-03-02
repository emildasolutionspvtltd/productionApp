import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { SecondaryService } from '../services/secondary.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  loggedIn:boolean = false
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

    return this.loggedIn
   
  }



  public   isRegistered(){






     return this.db.isRegistered()

  }
}
