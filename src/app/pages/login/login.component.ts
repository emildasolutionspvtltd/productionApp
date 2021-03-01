import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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




  constructor(private secService : SecondaryService,private router: Router,private db: DatabaseService) { }

  ngOnInit(): void {
  }
  routersCall(paths){
    this.secService.toggle()
    this.router.navigate([paths])
  }



  Login(){
    if(this.loginForm.valid){
      // this.db.enterLogin(this.loginForm.value).then(x=>{
      //    if(this.loginForm.value.password== x[0].password){
      //      console.log('success')
      //      this.secService.presentSanckBar('welcome to roza pos','success')
      //      this.routersCall('')
      //    }
      //    else{
      //      this.secService.presentSanckBar('please enter the correct password/email','ok')
      //    }
      // })
    }
  }
}
