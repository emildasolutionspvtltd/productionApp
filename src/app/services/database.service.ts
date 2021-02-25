import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private electron:ElectronService) { }

//ItemFunctions

deleteItem(id){
  return this.electron.ipcRenderer.invoke('deleteItem',id)
}

// //Test Functions 
//   getAllItems(){
//   return  this.electron.ipcRenderer.invoke('getAllItems')
//   }


//   insertData(data){
//     return this.electron.ipcRenderer.invoke('addData',data)
//   }




  //Items Functions
  insertSingleItem(data){
    return this.electron.ipcRenderer.invoke('insertSingleItem',data)
  }

  getAllItems(){
    return this.electron.ipcRenderer.invoke('getTabelAllItems')
  }
  getItemsCount(){
    return this.electron.ipcRenderer.invoke('itemCount')
  }


  //Category Functions

  insertCategory(data){
    console.log(data)
   return this.electron.ipcRenderer.invoke('insertCategory',data)
  }


getAllCategory(){
    return this.electron.ipcRenderer.invoke('getAllCategory')
   }
getCategoryCount(){
  return this.electron.ipcRenderer.invoke('categoryCount')
}

deleteCat(id){
  return this.electron.ipcRenderer.invoke('deleteCat',id)
}

getCategory(id){
  return this.electron.ipcRenderer.invoke('getCat',id)
}
getItem(id){
   return this.electron.ipcRenderer.invoke('getItem',id)
}
updateCategory(id,name){
  return this.electron.ipcRenderer.invoke('editCat',id,name)
}
updateitem(id,data){
return this.electron.ipcRenderer.invoke('editItem',id,data)
}

insertCustomer(data){
  return this.electron.ipcRenderer.invoke('insertCust',data)
}
searchCustomer(data){
  console.log(data)
  return this.electron.ipcRenderer.invoke('searchcust',data)
}

getCustomer(){
  return this.electron.ipcRenderer.invoke('getCust')
}
getCus(data){
  return this.electron.ipcRenderer.invoke('getindivisualCust',data)
}

deleteCust(id){
  return this.electron.ipcRenderer.invoke('deleteCust',id)
}
updateCust(id,data){
return this.electron.ipcRenderer.invoke('updateCust',id,data)
}

getItemBar(bar){
  return this.electron.ipcRenderer.invoke('itemBar',bar)
}
getCountBar(bar){
  return this.electron.ipcRenderer.invoke('itemCountBar',bar)
}
getName(data){
  return this.electron.ipcRenderer.invoke('getName',data)
}
getID(name){
  return this.electron.ipcRenderer.invoke('getId',name)
}
getTax(){
  return this.electron.ipcRenderer.invoke('getTax')
}
insertTax(data){
  return this.electron.ipcRenderer.invoke('insertTax',data)
}
getIndivisualTax(data){
  return this.electron.ipcRenderer.invoke('getIndivisualTax',data)
}
insertPay(data){
  return this.electron.ipcRenderer.invoke('insertPay',data)
}
getPay(){
  return this.electron.ipcRenderer.invoke('getPay')
}
getindivisualPay(data){
  return this.electron.ipcRenderer.invoke('getIndivisualPay',data)
}
getTransaction(){
 return this.electron.ipcRenderer.invoke('getTransaction')
}
updateInventory(id,inv){
  console.log(id)
  console.log(inv)
  return this.electron.ipcRenderer.invoke('updateInventory',id,inv)
}
printData(data){
  return this.electron.ipcRenderer.invoke('print',data)
}
addTransaction(data){
  return this.electron.ipcRenderer.invoke('addTransaction',data)
}
registerKey(data){
  return this.electron.ipcRenderer.invoke('registerKey',data)
}
validateKey(data){
  return this.electron.ipcRenderer.invoke('validateKey',data)
}
deleteTransaction(id){
  return this.electron.ipcRenderer.invoke('deleteTransaction',id)

}
getTransac(id){
  return this.electron.ipcRenderer.invoke('getTransac',id)
}
getPrinter(){
  return this.electron.ipcRenderer.invoke('getPrinter')
}
getBetweenDates(a,b){
  return this.electron.ipcRenderer.invoke('getBetweenDates',a,b)
}

delete(id){
  return this.electron.ipcRenderer.invoke('delete',id)
}

getinfo(id){
  return this.electron.ipcRenderer.invoke('getInfo',id)
}

updatePay(id,data){
  return this.electron.ipcRenderer.invoke('editPay',id,data)
  }
  updateTax(id,data){
    return this.electron.ipcRenderer.invoke('editTax',id,data)
    }
    getTaxInEx(tax){
      return this.electron.ipcRenderer.invoke('getInEx',tax)
    }

    addPrinter(data){
      return this.electron.ipcRenderer.invoke('addprinter',data)
    }

    addHeadFoot(data){
      return this.electron.ipcRenderer.invoke('addheadfoot',data)
    }
    getEnteredPrinter(){
       return this.electron.ipcRenderer.invoke('getSelectPrinter')
    }
    getEnterheadFoot(){
      return this.electron.ipcRenderer.invoke('getHeadFoot')

    }
}
