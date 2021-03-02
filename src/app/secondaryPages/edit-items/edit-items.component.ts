import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/services/database.service';
import { SecondaryService } from 'src/app/services/secondary.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.scss']
})
export class EditItemsComponent implements OnInit {
  units:Array<any>=[
    {
    unitName:'Units',
    unit:'Null'
  },
    {
    unitName:'Gram',
    unit:'g'
   },
   {
     unitName:'Kilogram',
     unit:'kg'
    },
    {
     unitName:'Milligram',
     unit:'mg'
    },
    {
     unitName:'Ounce',
     unit:'oz'
    },
    {
     unitName:'Pound',
     unit:'lb'
    },
    {
     unitName:'Stone',
     unit:'st'
    },
    {
     unitName:'Cubic Foot',
     unit:'cu ft'
    },
    {
     unitName:'Cubic Yard',
     unit:'cu yd'
    },
    {
     unitName:'Cup',
     unit:'c'
    },
    {
     unitName:'Fluid Ounce',
     unit:'fl oz'
    },
    {
     unitName:'Gallon',
     unit:'gal'
    },
    {
     unitName:'Litre',
     unit:'L'
    },
    {
     unitName:'Millilitre',
     unit:'mL'
    },
    {
     unitName:'Pint',
     unit:'pt'
    },
    {
     unitName:'Quart',
     unit:'qt'
    },
    {
     unitName:'Shot',
     unit:'sh'
    },
    {
     unitName:'Centimetre',
     unit:'cm'
    },
    {
     unitName:'Foot',
     unit:'ft'
    },
    {
     unitName:'Inch',
     unit:'in'
    },
    {
     unitName:'Kilometre',
     unit:'Km'
    },
    {
     unitName:'Metre',
     unit:'m'
    },
    {
     unitName:'Mile',
     unit:'mi'
    },
   {
     unitName:'Millimetre',
     unit:'mm'
    }, 
    {
     unitName:'Yard',
     unit:'yd'
    }, 
    {
     unitName:'Acre',
     unit:'ac'
    }, 
    {
     unitName:'Square Centimetre',
     unit:'cm^2'
    }, 
    {
     unitName:'Square Foot',
     unit:'sq ft'
    }, 
    {
     unitName:'Square Inch',
     unit:'sq in'
    }, 
    {
     unitName:'Square Kilometre',
     unit:'sq km'
    }, 
    {
     unitName:'Square Metre',
     unit:'m^2'
    }, 
    {
     unitName:'Square Mile',
     unit:'sq mi'
    }, 
    {
     unitName:'Square Yard',
     unit:'sq yd'
    }, 
                    
   ]
   
  constructor(private router :Router,private dialog:MatDialog,private db:DatabaseService, @Inject(SecondaryService) private secService: SecondaryService,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.getAllCategory()
    this.getInfo()
    this.getTax()
   }









   a :any
   itembarcode
   itemname
   itemarabic
   itemcat
   itemmrp
   itemprice
   itemtax
   iteminven
   itemunit
   categories
   taxes
  itemForm = new FormGroup({
    type : new FormControl('items'),
    barcode: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    nameInArabic: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    mrp: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    tax: new FormControl('', Validators.required),
    inventory: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required)
  }) 
  
  ngOnInit(): void {
    console.log(this.data)
  }

  // funtion to get all data
  getAllCategory(){
    this.db.getAllCategory().then(allCategory=>{
      console.log(allCategory)
     this.categories=allCategory
    })
  }
  getTax(){
    this.db.getTax().then(x=>{
      console.log(x)
    this.taxes = x
    })
    }
  // gets the requires data from database
  getInfo(){
  
    console.log(this.data)
 
   this.db.getItem(this.data).then(x=>{
     console.log(x)
     this.a = x[0]
    this.itembarcode = this.a.barcode,
   this.itemname = this.a.name,
   this.itemarabic = this.a.nameInArabic,
   this.itemcat  = this.a.category
   this.itemmrp = this.a.mrp,
   this.itemprice = this.a.price,
   this.itemtax = this.a.tax
   this.iteminven = this.a.inventory
   this.itemunit = this.a.unit
     //this.secService.presentSanckBar("👍 Category updated Successfully",'success')
    console.log(this.a)

   }).catch(error=>{
     console.log(Error)
   })
 

}

 closeDialog() {
   this.dialog.closeAll()
 }

 // funciton to validate and update items
 submit(){
console.log(this.itemForm.value)
  if(this.itemForm.valid){
    this.db.updateitem(this.data,this.itemForm.value).then(x=>{
      console.log(x)
      this.secService.presentSanckBar("👍 Item Updated Successfully",'success')
    })
  }else{
    console.log("not working") 
  }
}

}
