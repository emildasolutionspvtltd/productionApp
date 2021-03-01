import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';

var licenseKey = require('license-key-gen');
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

        var userInfo = { name: this.registerForm.value.name, email: this.registerForm.value.email, phoneNumber: this.registerForm.value.mobileNumber, company: this.registerForm.value.shopName, password: this.registerForm.value.password }
        var licenseData = { info: userInfo, prodCode: "LEN100120", appVersion: "1.5", osType: 'IOS8' }
       
       
       
       
        try {
          var license = licenseKey.validateLicense(licenseData, this.registerForm.value.serialKey);
          console.log(license);
          const now = new Date();
    now.setFullYear(now.getFullYear() + 1);

    console.log(now.toISOString().slice(0,10))
    this.registerForm.value.expiryDate = now.toISOString().slice(0,10)
    console.log(this.registerForm)
    this.db.enterUser(this.registerForm.value).then(x=>{
       console.log(x)
    }).catch(err=>{
      console.log(err)
    })

    this.router.navigate([''])
          this.secService.presentSanckBar('Registration Successful', 'sucess')

        } catch (err) {
          console.log(err);
          this.secService.presentSanckBar('License Invaild Please Try Again', 'ok')
        }


        //Validate Key 
        // this.db.validateKey(this.registerForm.value.serialKey).then(x => {


        //   this.db.register(this.registerForm.value).then(x=>{





        //     this.secService.presentSanckBar('You have registered successfully', 'success')



        //     // this.registerForm.reset()
        //      this.router.navigate([''])



        //   }).catch(err=>{
        //     this.secService.presentSanckBar(err,'danger')

        //   })

        // }).catch(err => {


        //   this.secService.presentSanckBar("Please enter validate key",'danger')

        // })


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
