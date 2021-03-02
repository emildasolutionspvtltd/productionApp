import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{ Items } from '../../services/types/items'
import { from } from 'rxjs';
import { SecondaryService } from 'src/app/services/secondary.service';



@Component({
  selector: 'app-add-single-item',
  templateUrl: './add-single-item.component.html',
  styleUrls: ['./add-single-item.component.scss']
})
export class AddSingleItemComponent implements OnInit {


  units:Array<any>=[{
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


  items:Array< Items>=[]

dataSource = this.items;
categories
taxes
displayedColumns: string[] = ['name', 'inventory', 'price'];

  constructor(private dialog: MatDialog , private db:DatabaseService,private secService:SecondaryService) { 
    
this.getAllCategory()
this.getTax()
  }

// finction t getr all the category
getTax(){
this.db.getTax().then(x=>{
  console.log(x)
this.taxes = x
})
}
   getAllCategory(){
     this.db.getAllCategory().then(allCategory=>{
       console.log(allCategory)
      this.categories=allCategory
     })
   }

// funcion to close the dialog box
  closeDialog() {
    this.dialog.closeAll()
  }

  ngOnInit(): void {
    
  }



// fucntion to validate and enter single item

  submit(){
    document.getElementById("codeInput").focus();
    if(this.itemForm.valid){
      this.db.insertSingleItem(this.itemForm.value).then(x=>{
        console.log(x)
        this.secService.presentSanckBar("👍 Item added Successfully",'success')
      })
    }else{
      //toast service 
    }
  }

}
