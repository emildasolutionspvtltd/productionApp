import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthServiceService} from './auth-service.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthServiceService, public router: Router) { }

  canActivate(): boolean {







    if (this.auth.isRegistered()) {
     console.log('Registered')
       if(this.auth.licenseValid()){
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
