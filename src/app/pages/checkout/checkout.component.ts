import { customer } from './../../services/types/customerType';
import { CheckoutServiceService } from './../../services/checkout-service.service';
import { CheckoutItem } from './../../services/types/checkoutItem';
import { Items } from './../../services/types/items';
import { AddCustomerComponent } from './../../secondaryPages/add-customer/add-customer.component';
import { DatabaseService } from './../../services/database.service';
import { SecondaryService } from './../../services/secondary.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ListCustomerComponent } from 'src/app/secondaryPages/list-customer/list-customer.component';
import { AddDiscountComponent } from 'src/app/secondaryPages/add-discount/add-discount.component';
import { FormControl } from '@angular/forms';
import { AddCheckoutComponent } from 'src/app/secondaryPages/add-checkout/add-checkout.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CheckOutItemComponent } from 'src/app/secondaryPages/check-out-item/check-out-item.component';
import { DisplayCheckoutComponent } from 'src/app/secondaryPages/display-checkout/display-checkout.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  searchBar = new FormControl('')
  searchBarValue: string = ''
  selectedPaymentMode = 'cash'
  itemCount
  itemInfo
  itemId
  sesarchItem
  data = [];
  one: string[] = ['']
  selectedStates
  searchText = '';
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  customerData: customer
  items: Array<CheckoutItem> = []
  dataSource: MatTableDataSource<CheckoutItem>
  updateResult
  indivisualTotal: number
  finalTotal: number
  finalDiscount: number = 0
  discountType: any
  totalCost: number = 0
  typesOfShoes = [];

  // gets value for search bar and payment modes from settings
  constructor(private matBottom: MatBottomSheet, private checkService: CheckoutServiceService, private dialog: MatDialog, private databaseService: DatabaseService, @Inject(SecondaryService) private secService: SecondaryService) {
    this.searchBar.valueChanges.subscribe(res => {
     
      this.searchBarValue = res
      this.searchBarcode(this.searchBarValue)
    })
    this.databaseService.getAllItems().then(x => {
      this.data = x
    })
    this.databaseService.getPay().then(x => {

      this.typesOfShoes = x
    })
  }


  /// this searches for the item when barcode is inserted
  searchBarcode(bar) {

    console.log(bar)
    this.databaseService.getItemBar(bar).then(x => {

      this.itemInfo = x
    }).catch(err => {
      console.log(err)
    })
    this.databaseService.getCountBar(bar).then(x => {

      this.itemCount = x
      this.getInfo()
    }).catch(err => {
      console.log(err)
    })

  }


  // gets information about the selected barcode and will trigger addcheckout component if more than one product returns 
  // or will proceed to inserting by calling insertData
  getInfo() {
    if (this.itemCount >= 2) {
      const dialogRef = this.dialog.open(AddCheckoutComponent, {
        height: '800px',
        width: '800px',
        data: { data: this.itemInfo }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.itemId = result;

        this.databaseService.getItem(this.itemId).then(x => {

          this.itemInfo = x[0]
          this.insertData(this.itemInfo)
        })
      });
    }
    else {
  
      this.insertData(this.itemInfo[0])
    }
  }
  ngOnInit(): void {
   
  }




  //drwaer toggle 

  drawerToggle() {
    this.secService.toggle()
  }


/// on clicking it calls discount customer and calculates total again by calling finalDiacount function
  addDiscount() {
    this.discountType = ""
    this.finalDiscount = 0
    let dialogRef = this.dialog.open(AddDiscountComponent, {
      maxWidth: '450px',
      width: '90%',
      panelClass: 'dialogCss'

    })
    dialogRef.afterClosed().subscribe(result => {
      this.finalDiscount = result.discount
      this.discountType = result.grp
      this.calculateTotal(this.dataSource.data)

    });
  }


// get all customers 
  //below button
  addCustomer() {
    let dialogRef = this.dialog.open(ListCustomerComponent, {
      maxWidth: '70%',
      width: '90%',
      panelClass: 'dialogCss'

    })
    dialogRef.afterClosed().subscribe(result => {
      this.customerData = result
      console.log(result)
    });


  }


  // seaches for all item and retrieves them
  searchItem() {
    this.databaseService.getAllItems().then(x => {
      this.sesarchItem = x
    })
  }
  displayedColumns: string[] = ['barcode', 'name', 'quantity', 'cost', 'tax', 'total', 'buttons'];
  i = 0;


  //inserts data selected from all three selecting modes to the checkout table and calcualtes total by calling calculateTotal function
  insertData(data) {
    console.log(data.price)
    this.indivisualTotal = this.costCalculation(data.price, 1)
    console.log(this.indivisualTotal)
    this.items.push({ barcode: data.barcode, name: data.name, nameInArabic: data.nameInArabic, category: data.category, discount: 1, quantity: 1, mrp: data.mrp, price: data.price, tax: data.tax, inventory: data.inventory, unit: data.unit, id: data._id, total: this.indivisualTotal })
    // this.totalPrice()

    this.dataSource = new MatTableDataSource<CheckoutItem>(this.items)
    var index
    this.calculateTotal(this.dataSource.data)
  }

// Actual calculation of the cost = price * quantity
  costCalculation(price, quantity) {
    console.log(quantity)
    console.log(price)
    return price * quantity;

  }



  // This calculates total by multiplying indivisual price and quantity. Then it adds all the indivisual total to get finalTotal
  public calculateTotal(data) {
    this.finalTotal = 0
    for (var index1 in data) {
      this.one[index1] = data[index1].total;
      this.finalTotal = this.finalTotal + this.one[index1]
    }
    this.getFinalDiscount()
    this.totalCost = this.finalTotal

  }



// when discount is added to the checkout table, otherwise 0
// Check if the selected is Sar
  getFinalDiscount() {
    if (this.finalDiscount != 0) {
      if (this.discountType == 'sar') {
        this.finalTotal = this.finalTotal - this.finalDiscount
      }
      else {
        this.finalTotal = this.finalTotal - (this.finalTotal * this.finalDiscount) / 100
      }
    }
  }


// when payment mode is selected by defuult is cash

  changeModePayment(choice) {
    this.selectedPaymentMode = choice
  }


  //this is the bottom sheet for editing quantity and price and it returns the vale as well as recalulates the total by calling updateResults function
  async options(data) {
    console.log(data)
    const bottomSheetRef = this.matBottom.open(CheckOutItemComponent, {
      data: data
    })
    bottomSheetRef.afterDismissed().subscribe((result) => {
      console.log(result)
      this.updateResult = result
      this.updateResult.total = this.costCalculation(this.updateResult.price, this.updateResult.quantity)
      console.log(this.updateResult)
      this.calculateTotal(this.dataSource.data)
      console.log('Bottom sheet has been dismissed.');
    });
  }


  /// next four  are for the search bar at the top pf the checkout page 
  keyword = 'name';

  selectEvent(item) {
    console.log(item)
    this.insertData(item)
  }

  onChangeSearch(val: string) {
    console.log(val)
  }

  onFocused(e) {
    console.log(e)
  }
  checkOut(){
              

/// to proceed to checkout through the checkout button passes 4 components data,total,pay and discount for display during print
const dialogRef = this.dialog.open(DisplayCheckoutComponent, {
  height: '400px',
  width: '400px',
  data: {
     data: this.dataSource.filteredData,
     total: this.finalTotal,
     pay : this.selectedPaymentMode,
     discount : this.finalDiscount,
     customer:this.customerData
    }
});

dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');

});
  }
}
