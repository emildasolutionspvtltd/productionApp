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
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', Validators.required),
    serialKey: new FormControl('', Validators.required)
  })

  constructor(private secService: SecondaryService, private router: Router, private db: DatabaseService) { 
    var userInfo = {company:"webisto.tech",street:"123 licenseKey ave", city:"city/town", state:"State/Province", zip:"postal/zip"}

    var licenseData = {info:userInfo,type :'license',prodCode: "LEN100120", appVersion: "1.5", osType: 'IOS8',license :'' }

        try {
          var license = licenseKey.createLicense(licenseData)
          licenseData.license = license.license
          console.log(licenseData);
          this.db.registerKey(licenseData).then(x=>{
console.log(x)
          })
        } catch (err) {
          console.log(err);
        }
  }

  ngOnInit(): void {
  }


  register() {
    console.log(this.registerForm.value)
    if (this.registerForm.value.password == this.registerForm.value.rePassword) {
      if (this.registerForm.valid) {
        this.db.validateKey(this.registerForm.value.serialKey).then(x=>{
console.log(x)
this.secService.presentSanckBar('You have registered successfully', 'success')
        }).catch(err=>{
          console.log(err)
        })
        this.registerForm.reset()
       // this.db.registerUser(this.registerForm.valid)
       
      }
      else{
        this.secService.presentSanckBar('Please enter correct value', 'ok')

      }

    }
    else {
      this.secService.presentSanckBar('Passwords do not match', 'ok')
    }

  }
  routersCall(paths) {
    this.secService.toggle()
    this.router.navigate([paths])
  }


}
