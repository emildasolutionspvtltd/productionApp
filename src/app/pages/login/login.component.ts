import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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




  constructor(private secService : SecondaryService,private router: Router) { }

  ngOnInit(): void {
  }
  routersCall(paths){
    this.secService.toggle()
    this.router.navigate([paths])
  }
}
