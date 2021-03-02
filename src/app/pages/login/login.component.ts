import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { DatabaseService } from 'src/app/services/database.service';

import { SecondaryService } from 'src/app/services/secondary.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm= new FormGroup({
  email:new FormControl('',Validators.required),
  password:new FormControl('',Validators.required)
})




  constructor(private secService : SecondaryService,private router: Router,private db: DatabaseService,private auth:AuthServiceService) { }

  ngOnInit(): void {
  }
  routersCall(paths){
    this.secService.toggle()
    this.router.navigate([paths])
  }



  async Login(){
    if(this.loginForm.valid){

    let userData = await this.db.isRegistered()

    if(userData.email === this.loginForm.value.email && userData.password === this.loginForm.value.password){

      this.auth.loggedIn = true
      this.loginForm.reset()
      this.router.navigate([''])
    
    }else{
      
    this.secService.presentSanckBar('please enter the correct password/email','ok')

    }
    

  
    }
  }
}
