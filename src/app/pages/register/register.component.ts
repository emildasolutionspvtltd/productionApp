import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';

// var licenseKey = require('license-key-gen');
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {



  registerForm = new FormGroup({
    type: new FormControl('userinfo'),
    name: new FormControl('', Validators.required),
    shopName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', Validators.required),
    serialKey: new FormControl('', Validators.required)
  })

  constructor(private secService: SecondaryService, private router: Router, private db: DatabaseService) {


  
  }

  ngOnInit(): void {
  }


  register() {
    //form Validation 
    if (this.registerForm.valid) {
    //Password Match 
    if (this.registerForm.value.password == this.registerForm.value.rePassword) {

  

        //Validate Key 
        this.db.validateKey(this.registerForm.value.serialKey).then(x => {


          this.db.register(this.registerForm.value).then(x=>{


            


            this.secService.presentSanckBar('You have registered successfully', 'success')



            // this.registerForm.reset()
             this.router.navigate([''])



          }).catch(err=>{
            this.secService.presentSanckBar(err,'danger')

          })
          
        }).catch(err => {


          this.secService.presentSanckBar("Please enter validate key",'danger')

        })


        //this.registerForm.reset()
        // this.db.registerUser(this.registerForm.valid)

      }
      else {
        this.secService.presentSanckBar('Passwords do not match', 'danger')
      }

    }
    else {
      this.secService.presentSanckBar('Please enter correct value', 'danger')

    }
    

  }
  routersCall(paths) {
    this.secService.toggle()
    this.router.navigate([paths])
  }


}
