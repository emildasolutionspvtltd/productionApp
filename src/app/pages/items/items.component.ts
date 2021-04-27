import { MatPaginator } from '@angular/material/paginator';
import { CheckoutItem } from './../../services/types/checkoutItem';
import { MatTableDataSource } from '@angular/material/table';
import { Items } from './../../services/types/items';
import { AddItemOptionComponent } from '../../secondaryPages/add-item-option/add-item-option.component';
import { SecondaryService } from './../../services/secondary.service';
import { Component, OnInit, Inject, ViewChild, QueryList, ViewChildren } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { DatabaseService } from 'src/app/services/database.service';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { MatDialog } from '@angular/material/dialog';
import { AddSingleItemComponent } from 'src/app/secondaryPages/add-single-item/add-single-item.component';
import { AddItemsBulkComponent } from 'src/app/secondaryPages/add-items-bulk/add-items-bulk.component';
import { AddItemsCategoryComponent } from 'src/app/secondaryPages/add-items-category/add-items-category.component';
import { MatSort } from '@angular/material/sort';
import { EditItemsComponent } from 'src/app/secondaryPages/edit-items/edit-items.component';
import { EditCategoryComponent } from 'src/app/secondaryPages/edit-category/edit-category.component';
import { AddInventoryComponent } from 'src/app/secondaryPages/add-inventory/add-inventory.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorU') paginatorU: MatPaginator;
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
categorycount : any
itemscount : any
 items:Array<Items>=[]
 dataSource : MatTableDataSource<Items>
 categoryData:MatTableDataSource<any>
 displayedColumnsCategory:string[]=['name','count','button']
 allTaxes
 displayedColumns: string[] = ['name', 'inventory', 'price','button'];

 // get all the items and categories
  constructor(private dialog:MatDialog,private db:DatabaseService, private matBottom: MatBottomSheet, @Inject(SecondaryService) private secService: SecondaryService) { 
this.getCountCategory()
   this.getTabelAllItems()
   this.getAllCategory()
   this.getCountItems()
   this.getTax()
  }

  ngOnInit(): void {
  

  }
  
 
  
 
// this will call addsingle item and then get items again
  async routeToSingle(){

    //try


    const dialogRef = await this.dialog.open(AddSingleItemComponent,{
      maxWidth:'450px',
      width:'90%',
      panelClass:'dialogCss'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory()
      this.getCountItems()
    this.getTabelAllItems()
      console.log('The dialog was closed');
    });
  }
  async routeToBulk(){
 

    const dialogRef =  await this.dialog.open(AddItemsBulkComponent)

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory()
    this.getTabelAllItems()
      console.log('The dialog was closed');
    });
  }


  //call the addcategories and then gets category again
  async routeToCategory(){


    const dialogRef =  await this.dialog.open(AddItemsCategoryComponent)
    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory()
    this.getTabelAllItems()
      console.log('The dialog was closed');
    });
  }
  async getTax(){ 
    this.db.getTax().then(x =>{
      console.log(x)
      this.allTaxes = x
    })
     
       
     }



////getss categroies count 

  async getCountCategory(){ 
 this.db.getCategoryCount().then(x =>{
   console.log(x)
   this.categorycount = x
   this.getAllCategory()
 })
  
    
  }
// get count of item 
  async getCountItems(){ 
    this.db.getItemsCount().then(x =>{
      console.log(x)
      this.itemscount = x
      this.getTabelAllItems()
    })


  }



  //Increase inventory

  addInventory(id,inventory,unit){

    let inventoryDialog =  this.dialog.open(AddInventoryComponent,{
      maxWidth:'450px',
      width:'90%',
      panelClass:'dialogCss',
      data:unit
    })


    inventoryDialog.afterClosed().subscribe( async result => {
    console.log(result)
       if (result) {
let finalInventory:number= inventory+result
        
this.db.increaseInventory(id,finalInventory).then( x=>{
  this.getAllCategory()
  this.getTabelAllItems()
  this.secService.presentSanckBar("Inventory Added Succcessfully",'success')
}).catch(err=>{
  this.secService.presentSanckBar(err,'Danger')
})


      }
    });


  }


// getss all the items
  getTabelAllItems(){
    this.db.getAllItems().then(data=>{
      this.items = data
      console.log(this.items)
     this.dataSource = new MatTableDataSource<Items>(this.items) 
     this.dataSource.paginator = this.paginator;
 
     })
  }
  



  drawerToggle() {
    this.secService.toggle()
  }




  

  async options(){
    return await  this.matBottom.open(AddItemOptionComponent)
  }




// delete the items 
  deleteItem(id){
    this.db.deleteItem(id).then(x=>{
      console.log("successFully Deleted")
      this.getTabelAllItems()
    })


  }

  //category
// get all the category 
getAllCategory(){
  this.db.getAllCategory().then(data=>{
    console.log(data)
  this.categoryData =  new MatTableDataSource(data)
this.categoryData.paginator = this.paginatorU
 
  })
}
// deletes the categories
  deleteCat(id){
    this.db.deleteCat(id).then(x=>{
      console.log("successFully Deleted")
      this.getAllCategory()
  })
  }
  
// the sorting for the table items 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //edits categories
  editCat(id){
     console.log(id)
     const dialogRef = this.dialog.open(EditCategoryComponent,{
      maxWidth:'450px',
      width:'90%',
      panelClass:'dialogCss',
      data: id
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory()
    this.getTabelAllItems()
      console.log('The dialog was closed');
    });
  
    

  }

  //edits items 
  editItem(id){
    console.log(id)
    const dialogRef = this.dialog.open(EditItemsComponent,{
      data:id,
      maxWidth:'450px',
      width:'90%',
      panelClass:'dialogCss'
      
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory()
    this.getTabelAllItems()
      console.log('The dialog was closed');
    });
 }
}
