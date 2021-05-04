const { app, ipcMain, ipcRenderer, BrowserWindow, dialog } = require('electron');
let win;
let fs = require('fs')



const { fse } = require('fs-extra');



let appDocument = app.getPath('documents')
const { PosPrinter } = require("electron-pos-printer");
var licenseKey = require('license-key-gen');

function createWindow() {
    win = new BrowserWindow({
        show:false,
        webPreferences: {

            nodeIntegration: true,
            backgroundThrottling: false
        },
        height: 760,
        width: 1024,
        backgroundColor: '#ffffff',
        icon: __dirname + '/favicon.ico',
    })

   
    win.loadURL(`file://${__dirname}/dist/index.html`)
    win.on('closed', function () {
        win = null;
    })

    win.setMenuBarVisibility(false)

win.maximize()
win.show()
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
var db = new Datastore({ filename: path.join(appDocument, 'dataPos/pos.db'), autoload: true });

var itemDb = new Datastore({ filename: path.join(appDocument, 'dataPos/item.db'), autoload: true });

var transactionDb = new Datastore({ filename: path.join(appDocument, 'dataPos/transaction.db'), autoload: true });

var customerDb = new Datastore({ filename: path.join(appDocument, 'dataPos/customer.db'), autoload: true });

var settingDb = new Datastore({ filename: path.join(appDocument, 'dataPos/setting.db'), autoload: true });

var categoryDb = new Datastore({ filename: path.join(appDocument, 'dataPos/category.db'), autoload: true });

var secondaryDb = new Datastore({ filename: path.join(appDocument, 'dataPos/secondary.db'), autoload: true });

var userDb = new Datastore({ filename: path.join(appDocument, 'dataPos/user.db'), autoload: true });







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

    
    data.name = data.name.toLowerCase()
    data.type='items'
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
    name = name.toLowerCase()
    return categoryDb.update({ _id: id }, { $set: { categoryName: name } }, {}, function (err, numReplaced) {

    });
})


ipcMain.handle('getItem', async (event, id,) => {
    return itemDb.find({ _id: id }, function (err, docs) {

    })


})

//isRegister
ipcMain.handle('isRegister', async (event, id,) => {
    return itemDb.find({}, function (err, docs) {

    })
})


//searchingItem
ipcMain.handle('searchItem', async (event, data) => {

    data = data.toLowerCase()
    temp = new RegExp(data)
    //   console.log( temp)
    return itemDb.find({ name: temp }, function (err, docs) {
    }).limit(20)
})



ipcMain.handle('searchItemArabic', async (event, data) => {

console.log("Arabic Search")
    temp = new RegExp(data)
    //   console.log( temp)
    return itemDb.find({ nameInArabic: temp }, function (err, docs) {
    }).limit(20)
})






ipcMain.handle('editItem', async (event, id, data) => {
    data.name = data.name.toLowerCase()
    return itemDb.update({ _id: id }, {
        $set: {
            barcode: data.barcode,
            name: data.name,
            nameInArabic: data.nameInArabic,
            category: data.category,
            mrp: data.mrp,
            price: data.price,
            tax: data.tax,

            unit: data.unit
        }
    }, {}, function (err, numReplaced) {

    });
})



ipcMain.handle('insertCust', async (event, data) => {
    data.name = data.name.toLowerCase()
    return customerDb.insert(data, function (err, Newdata) {

    })
})




//searchingCustomer
ipcMain.handle('searchcust', async (event, data) => {
    // console.log(data)
    data = data.toLowerCase()
    temp = new RegExp(data)
    //   console.log( temp)
    return customerDb.find({ name: temp }, function (err, docs) {
    }).limit(10)
})


ipcMain.handle('searchcustnumber', async (event, data) => {
    // console.log(data)
    
    temp = new RegExp(data)
    //   console.log( temp)
    return customerDb.find({ phNumber: temp }, function (err, docs) {
    }).limit(10)
})




//getAllCustomers
ipcMain.handle('getCust', async (event) => {
    return customerDb.find({ type: 'customer' })
})

ipcMain.handle('getindivisualCust', async (event, data) => {
    return customerDb.find({ _id: data })
})
//customer Delte
ipcMain.handle('deleteCust', async (event, id) => {

    return customerDb.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})



//updating Customer Database
ipcMain.handle('updateCust', async (event, id, data) => {
    data.name = data.name.toLowerCase()
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

ipcMain.handle('insertPay', async (event, data) => {
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
    return transactionDb.find({ type: 'transaction' }).sort({ time: -1 })
})



//waste update inventory

ipcMain.handle('updateInventory', async (event, id, inv) => {
    return itemDb.find({ _id: id }, function (err, numReplaced) {

    });
})
ipcMain.handle('increaseInv', async (event, id, inv) => {
    return itemDb.update({ _id: id }, { $set: { inventory: inv } }, {}, function () {
        // The fruits array didn't change
        // If we had used a fruit not in the array, e.g. 'banana', it would have been added to the array
    });

})


ipcMain.handle('printLabel', async (event, data, printer)=>{

    const options = {
        preview: false,
        silent:true,               // Preview in window or print
        width: printer.width,               //  width of content body
        margin: '0 0 0 0',            // margin of content body
        copies: 1,                    // Number of copies to print
        printerName: printer.labelPrinter,        // printerName: string, check with webContent.getPrinters()
        timeOutPerLine: 400,
        pageSize: { height: 301000, width: 71000 }  // page size
    }
    console.log(printer.name)

    PosPrinter.print(data, options)
        .then(() => { return "sucess" })
        .catch((error) => {
            console.error(error);
        });

  
}  )





//printing Option
ipcMain.handle('print', async (event, data, printer) => {
    //Add Header and Footer

    let headerFooter = await settingDb.findOne({ type: 'printData' }, function (err, docs) { })


    let topArray = []
    if (headerFooter) {

        topArray.push({
            type: 'image',
            path: path.join(appDocument, 'dataPos/logo.jpg'),     // file path
            position: 'center',                                  // position of image: 'left' | 'center' | 'right'
            width: '60px',                                           // width of image in px; default: auto
            height: '60px',                                          // width of image in px; default: 50 or '50px'
        })

        if (headerFooter.header) {
            topArray.push({
                type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                value: headerFooter.header,
                style: `text-align:center;`,
                css: { "font-weight": "700", "font-size": "18px" }
            })
        }
            if (headerFooter.subHeader) {
                topArray.push({
                    type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                    value: headerFooter.subHeader,
                    style: `text-align:center;`,
                    css: { "font-weight": "700", "font-size": "10px" }
                })
            }


            //adding Data to table
   topArray =topArray.concat(data)




if (headerFooter.subFooter) {
    topArray.push({
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: headerFooter.subFooter,
        style: `text-align:center;`,
        css: { "font-weight": "700", "font-size": "10px" }
    })
}

if (headerFooter.footer) {
    topArray.push({
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: headerFooter.footer,
        style: `text-align:center;`,
        css: { "font-weight": "700", "font-size": "10px" }
    })
}




        }












        console.log(topArray)
        // let printer = printersInfo.filter(printer => printer.isDefault === true)[0];

        const options = {
            preview: false,               // Preview in window or print
            width: printer.width,               //  width of content body
            margin: '0 0 0 0',            // margin of content body
            copies: 1,  
            silent:true,                  // Number of copies to print
            printerName:printer.recieptPrinter,        // printerName: string, check with webContent.getPrinters()
            timeOutPerLine: 400,
            pageSize: { height: 301000, width: 71000 }  // page size
        }
        console.log(printer.name)
console.log("heloo ++++++++")
console.log(printer)

        PosPrinter.print(topArray, options)
            .then(() => { return "sucess" })
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
    return userDb.find({ type: 'license', license: data }, {}, function (err, numReplaced) {

    });
})





//transactions delete
ipcMain.handle('deleteTransaction', async (event, id) => {

    return transactionDb.find({ _id: id }, {}, function (err, numRemoved) {
    });

})



//get Transactions

ipcMain.handle('getTransac', async (event, id) => {

    return transactionDb.find({ _id: id }, {
    });

})






ipcMain.handle('getPrinter', async (event) => {
    let printersInfo = win.webContents.getPrinters();
    return printersInfo
})




//Sales Report
ipcMain.handle('getBetweenDates', async (event, a, b) => {

    return transactionDb.find({ $and: [{ time: { $gte: a } }, { time: { $lt: b } }] }, function (err, docs) {
    });
})



//delete Item
ipcMain.handle('delete', async (event, id) => {

    return settingDb.remove({ _id: id }, {}, function (err, numRemoved) {
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
            inex: data.inex
        }
    }, {}, function (err, numReplaced) {

    });
})




ipcMain.handle('getInEx', async (event, tax) => {

    return db.find({ taxName: tax }, {
    });

})




//printer 
ipcMain.handle('addReceiptPrinter', async (event, data) => {
    console.log(data)
    return settingDb.update({ type: 'recipetPrinter' }, data, { upsert: true }, function (err, Newdata) {

    })
})



//printer 
ipcMain.handle('addLablePrinter', async (event, data) => {
    console.log(data)
    return settingDb.update({ type: 'labelPrinter' }, data, { upsert: true }, function (err, Newdata) {

    })
})



ipcMain.handle('getReceiptPrinter', async (event, id,) => {
    return settingDb.findOne({ type: 'recipetPrinter' }, function (err, docs) {

    })
})



ipcMain.handle('getLabelPrinter', async (event, id,) => {
    return settingDb.findOne({ type: 'labelPrinter' }, function (err, docs) {

    })
})



//secdary
ipcMain.handle('addheadfoot', async (event, data) => {
    console.log(data)
    return settingDb.update({ type: 'printData' }, data, { upsert: true }, function (err, Newdata) {

    })
})


ipcMain.handle('getHeadFoot', async (event, id,) => {
    return settingDb.findOne({ type: 'printData' }, function (err, docs) {

    })
})

ipcMain.handle('getUser', async (event) => {
    return userDb.findOne({ type: 'userinfo' }, function (err, docs) {

    })


})





ipcMain.handle('enterUser', async (event, data) => {
    return userDb.insert(data, function (err, Newdata) {

    })


})


ipcMain.handle('register', async (event, data) => {
    return userDb.insert(data, function (err, Newdata) {

    })

})





ipcMain.handle('licenseKey', async (event, data) => {

    var licenseData = { info: userInfo, prodCode: "LEN100120", appVersion: "1.5", osType: 'IOS8' }


    return licenseKey.validateLicense(licenseData, serialKey)


})







ipcMain.handle('receiptLogo', async (event, data) => {

    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Images', extensions: ['jpg'] }]


    }).then(paths => {
        console.log(paths)
        if (paths.canceled == false) {
            console.log(path)
            fs.rename(paths.filePaths[0], path.join(appDocument, 'dataPos/logo.jpg'), function (err) {
                console.log('asfasd')


            })
        }
    })
})



ipcMain.handle('getLogo', async (event, data) => {
    return path.join(appDocument, 'dataPos/logo.jpg')
})


ipcMain.handle('changePassword', async (event, data) => {
    return userDb.update({ type: 'userinfo' },{$set :{"password":data}}, { upsert: true })
})



