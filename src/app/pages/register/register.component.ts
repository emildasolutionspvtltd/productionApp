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

    //Password Match 
    if (this.registerForm.value.password == this.registerForm.value.rePassword) {

      //form Validation 
      if (this.registerForm.valid) {

        //Validate Key 
        this.db.validateKey(this.registerForm.value.serialKey).then(x=>{
console.log(x)
this.secService.presentSanckBar('You have registered successfully', 'success')
        }).catch(err=>{

          this.secService.presentSanckBar("sum", 'g')

        })
        this.registerForm.reset()
       // this.db.registerUser(this.registerForm.valid)
       
      }
      else{
        this.secService.presentSanckBar('Please enter correct value', 'success')

      }

    }
    else {
      this.secService.presentSanckBar('Passwords do not match', 'danger')
    }

  }
  routersCall(paths) {
    this.secService.toggle()
    this.router.navigate([paths])
  }


}
