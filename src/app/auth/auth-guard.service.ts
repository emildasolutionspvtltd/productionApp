import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthServiceService} from './auth-service.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthServiceService, public router: Router) { }

  async canActivate(): Promise<boolean> {







    if (await this.auth.isRegistered() != null) {
let userDb = await this.auth.isRegistered()
let currentDate = new Date (Date.now())
let expireDate = new Date (userDb.expiryDate)
console.log(expireDate)
       if(currentDate<expireDate){
        console.log('license')


        if(this.auth.isAuthenticated()){


return true
        }
        else{
          this.router.navigate(['login']);
          return false;

        }

       }
       else{

        this.router.navigate(['expire']);
          return false;

       }




    }else{
      this.router.navigate(['register']);
      return false;
     
    }

  }
}
