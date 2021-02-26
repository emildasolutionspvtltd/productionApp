const { app, ipcMain, ipcRenderer, BrowserWindow, } = require('electron');
let win;
const { PosPrinter } = require("electron-pos-printer");

function createWindow() {
    win = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
        height: 760,
        width: 1024,
        backgroundColor: '#ffffff'
    })

    win.webContents.openDevTools()
    win.loadURL(`file://${__dirname}/dist/Desktopapp/index.html`)
    win.on('closed', function () {
        win = null;
    })


}

app.on('ready', createWindow)

app.on('windows-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    app.log
})
app.on('activate', function () {
    if (win == null) {
        createWindow()
    }
})

const Datastore = require('nedb-promises')
const path = require('path');
var db = new Datastore({filename:path.join(__dirname, 'pos.db'), autoload:true});

var itemDb = new Datastore({filename:path.join(__dirname, 'item.db'), autoload:true});

var transactionDb = new Datastore({filename:path.join(__dirname, 'transaction.db'), autoload:true});

var customerDb = new Datastore({filename:path.join(__dirname, 'customer.db'), autoload:true});

var settingDb = new Datastore({filename:path.join(__dirname, 'setting.db'), autoload:true});

var categoryDb = new Datastore({filename:path.join(__dirname, 'category.db'), autoload:true});

var secondaryDb = new Datastore({filename:path.join(__dirname, 'secondary.db'), autoload:true});

var userDb = new Datastore({filename:path.join(__dirname, 'user.db'), autoload:true});







const { electron } = require('process');
const { createRegularExpressionLiteral } = require('typescript');

//Category Functions
// doesnt require to make the function just the name assignecd to it 
ipcMain.handle('insertCategory', async (event, data) => {
    return categoryDb.insert(data, function (err, newDoc) {

    })

})
// function for getting all category
ipcMain.handle('getAllCategory', async (event) => {

    return categoryDb.find({ type: 'category' }, function (err, docs) {
    })
})
// function to insert a single item 
ipcMain.handle('insertSingleItem', async (event, data) => {
    data.name=data.name.toLowerCase()
    return itemDb.insert(data, function (err, Newdata) {

    })
})
// function to get all the items table value
ipcMain.handle('getTabelAllItems', async (event) => {

    return itemDb.find({ type: 'items' }, function (err, docs) {
    })
})

// function to get count for category
ipcMain.handle('categoryCount', async (event) => {

    return categoryDb.count({ type: 'category' }, function (err, count) {
    });

})
// deleting items from the table
ipcMain.handle('deleteItem', async (event, id) => {

    return itemDb.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})


ipcMain.handle('deleteCat', async (event, id) => {

    return categoryDb.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})



ipcMain.handle('itemCount', async (event) => {

    return itemDb.count({ type: 'items' }, function (err, count) {
    });

})


ipcMain.handle('getCat', async (event, id) => {
    return categoryDb.find({ _id: id }, function (err, docs) {

    })
})

ipcMain.handle('editCat', async (event, id, name) => {
    return categoryDb.update({ _id: id }, { $set: { categoryName: name } }, {}, function (err, numReplaced) {

    });
})


ipcMain.handle('getItem', async (event, id,) => {
    return itemDb.find({ _id: id }, function (err, docs) {

    })


})



//searchingItem
ipcMain.handle('searchItem', async (event, data) => {
   
    data=data.toLowerCase()
    temp= new RegExp(data)
//   console.log( temp)
    return itemDb.find({ name:temp }, function (err, docs) {
    })
})




ipcMain.handle('editItem', async (event, id, data) => {
    data.name=data.name.toLowerCase()
    return itemDb.update({ _id: id }, {
        $set: {
            barcode: data.barcode,
            name: data.name,
            nameInArabic: data.nameInArabic,
            category: data.category,
            mrp: data.mrp,
            price: data.price,
            tax: data.tax,
            inventory: data.inventory,
            unit: data.unit
        }
    }, {}, function (err, numReplaced) {

    });
})



ipcMain.handle('insertCust', async (event, data) => {
    data.name=data.name.toLowerCase()
    return customerDb.insert(data, function (err, Newdata) {

    })
})




//searchingCustomer
ipcMain.handle('searchcust', async (event, data) => {
    // console.log(data)
    data.name=data.name.toLowerCase()
    temp= new RegExp(data)
//   console.log( temp)
    return customerDb.find({ name:temp }, function (err, docs) {
    })
})



//getAllCustomers
ipcMain.handle('getCust', async (event) => {
    return customerDb.find({ type: 'customer' })
})

ipcMain.handle('getindivisualCust', async (event,data) => {
    return customerDb.find({ _id: data })
})
//customer Delte
ipcMain.handle('deleteCust', async (event, id) => {

    return customerDb.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})



//updating Customer Database
ipcMain.handle('updateCust', async (event, id, data) => {
    data.name=data.name.toLowerCase() 
       return customerDb.update({ _id: id }, {
        $set: {
            barcode: data.barcode,
            name: data.name,
            email: data.email,
            phNumber: data.phNumber,
            notes: data.notes,
        }
    }, {}, function (err, numReplaced) {

    });
})




//Search by Barcode
ipcMain.handle('itemBar', async (event, bar) => {
    return itemDb.find({ barcode: bar })
})



//Count of same find
ipcMain.handle('itemCountBar', async (event, bar) => {
    return itemDb.count({ barcode: bar })
})



//waste Functions
ipcMain.handle('getName', async (event, data) => {
    return db.find({ name: data })
})


//waste functions
ipcMain.handle('getId', async (event, name) => {
    return db.find({ name: name })
})



//getting Tax
ipcMain.handle('getTax', async (event) => {
    return settingDb.find({ type: 'tax' })
})



//inserting Tax
ipcMain.handle('insertTax', async (event, data) => {
    console.log(data)
    return settingDb.insert(data, function (err, Newdata) {

    })
})

//get indivisual tax
ipcMain.handle('getIndivisualTax', async (event, id,) => {
    return settingDb.find({ _id: id }, function (err, docs) {

    })


})


//getting Payment Methods

ipcMain.handle('insertPay', async (event,data) => {
    return settingDb.insert(data, function (err, Newdata) {

    })
})
//get payment
ipcMain.handle('getPay', async (event) => {
    return settingDb.find({ type: 'payment' })
})
//get indivisual payment

ipcMain.handle('getIndivisualPay', async (event, id,) => {
    return settingDb.find({ _id: id }, function (err, docs) {

    })


})

//getting Transactions
ipcMain.handle('getTransaction', async (event) => {
    return transactionDb.find({ type: 'transaction' })
})



//waste update inventory

ipcMain.handle('updateInventory', async (event, id, inv) => {
    return itemDb.update({ _id: id }, { $set: { inventory: inv } }, {}, function (err, numReplaced) {

    });
})





//printing Option
ipcMain.handle('print', async (event, data) => {
    console.log(data)
    let printersInfo = win.webContents.getPrinters();
    let printer = printersInfo.filter(printer => printer.isDefault === true)[0];
    const options = {
        preview: true,               // Preview in window or print
        width: '170px',               //  width of content body
        margin: '0 0 0 0',            // margin of content body
        copies: 1,                    // Number of copies to print
        printerName: printer.name,        // printerName: string, check with webContent.getPrinters()
        timeOutPerLine: 400,
        pageSize: { height: 301000, width: 71000 }  // page size
    }
    console.log(printer.name)
    PosPrinter.print(data, options)
        .then(() => {return "sucess" })
        .catch((error) => {
            console.error(error);
        });
})





//transactions

ipcMain.handle('addTransaction', async (event, data) => {
    console.log(data)
    return transactionDb.insert(data, function (err, Newdata) {

    })
})




ipcMain.handle('registerKey', async (event, data) => {
    return userDb.insert(data, function (err, Newdata) {

    })
})


ipcMain.handle('validateKey', async (event, data) => {
    return userDb.find({type:'license', license:data },  {}, function (err, numReplaced) {

    });
})





//transactions delete
ipcMain.handle('deleteTransaction', async (event, id) => {

    return transactionDb.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})



//get Transactions

ipcMain.handle('getTransac', async (event, id) => {

    return transactionDb.find({ _id: id },{
    });

})






ipcMain.handle('getPrinter', async (event) => {
    let printersInfo = win.webContents.getPrinters();
    return printersInfo
})




//Sales Report
ipcMain.handle('getBetweenDates', async (event, a,b) => {

    return transactionDb.find({ $and: [{ time: {$gte: a} }, { time: { $lt: b } }] }, function (err, docs) {
      });
})



//delete Item
ipcMain.handle('delete', async (event, id) => {

    return itemDb.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})



//getting info of a product
ipcMain.handle('getInfo', async (event, id,) => {
    return itemDb.find({ _id: id }, function (err, docs) {

    })


})





//edit payment Method

ipcMain.handle('editPay', async (event, id, data) => {
    console.log(data)
    return settingDb.update({ _id: id }, {
        $set: {
            paymentName: data.paymentName,
            notes: data.notes
        }
    }, {}, function (err, numReplaced) {

    });
})
ipcMain.handle('editTax', async (event, id, data) => {
    console.log(data)
    return settingDb.update({ _id: id }, {
        $set: {
            taxName: data.taxName,
            taxPercentage: data.taxPercentage,
            inex : data.inex
        }
    }, {}, function (err, numReplaced) {

    });
})




ipcMain.handle('getInEx', async (event, tax) => {

    return db.find({ taxName: tax },{
    });

})




//printer 
ipcMain.handle('addprinter', async (event, data) => {
    console.log(data)
    return settingDb.insert(data, function (err, Newdata) {

    })
})


//secdary
ipcMain.handle('addheadfoot', async (event, data) => {
    console.log(data)
    return settingDb.insert(data, function (err, Newdata) {

    })
})
ipcMain.handle('getSelectPrinter', async (event, id,) => {
    return settingDb.find({ type: 'printer' }, function (err, docs) {

    })


})
ipcMain.handle('getHeadFoot', async (event, id,) => {
    return settingDb.find({ type:'headerfooter' }, function (err, docs) {

    })


})
ipcMain.handle('getKey', async (event) => {
    return userDb.find({ type: 'license' }, function (err, docs) {

    })


})
ipcMain.handle('getUser', async (event) => {
    return userDb.find({ type: 'userinfo' }, function (err, docs) {

    })


})


ipcMain.handle('enterUser', async (event,data) => {
    return userDb.insert(data, function (err, Newdata) {

    })


})