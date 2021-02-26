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

  public isAuthenticated(): boolean {
    if(this.licenseValid()){
     this.secService.presentSanckBar('welcome ', 'sucess')
      return true
    }
    return false
  }


  public licenseValid(): boolean {
    if(this.isRegistered()){
      this.db.getKey().then(x => {
        console.log(x.length)
        if (x.length > 0) {
          return true
        }
      })
    }
    return false
  }

  public isRegistered(): boolean{
    this.db.getUser().then(x => {
      console.log(x.length)
      if (x.length > 0) {
        return true
      }
    })
    return false
  }
}
