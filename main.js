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

const { electron } = require('process');

//Category Functions
// doesnt require to make the function just the name assignecd to it 
ipcMain.handle('insertCategory', async (event, data) => {
    return db.insert(data, function (err, newDoc) {

    })

})
// function for getting all category
ipcMain.handle('getAllCategory', async (event) => {

    return db.find({ type: 'category' }, function (err, docs) {
    })
})
// function to insert a single item 
ipcMain.handle('insertSingleItem', async (event, data) => {
    return db.insert(data, function (err, Newdata) {

    })
})
// function to get all the items table value
ipcMain.handle('getTabelAllItems', async (event) => {

    return db.find({ type: 'items' }, function (err, docs) {
    })
})

// function to get count for category
ipcMain.handle('categoryCount', async (event) => {

    return db.count({ type: 'category' }, function (err, count) {
    });

})
// deleting items from the table
ipcMain.handle('deleteItem', async (event, id) => {

    return db.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})


ipcMain.handle('deleteCat', async (event, id) => {

    return db.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})



ipcMain.handle('itemCount', async (event) => {

    return db.count({ type: 'items' }, function (err, count) {
    });

})


ipcMain.handle('getCat', async (event, id) => {
    return db.find({ _id: id }, function (err, docs) {

    })
})

ipcMain.handle('editCat', async (event, id, name) => {
    return db.update({ _id: id }, { $set: { categoryName: name } }, {}, function (err, numReplaced) {

    });
})


ipcMain.handle('getItem', async (event, id,) => {
    return db.find({ _id: id }, function (err, docs) {

    })


})


ipcMain.handle('editItem', async (event, id, data) => {
    console.log(data)
    return db.update({ _id: id }, {
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
    console.log(data)
    return db.insert(data, function (err, Newdata) {

    })
})



ipcMain.handle('searchcust', async (event, data) => {
    return db.find({ name: data }, function (err, docs) {
    })
})

ipcMain.handle('getCust', async (event) => {
    return db.find({ type: 'customer' })
})
ipcMain.handle('deleteCust', async (event, id) => {

    return db.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})

ipcMain.handle('updateCust', async (event, id, data) => {
    console.log(data)
    return db.update({ _id: id }, {
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

ipcMain.handle('itemBar', async (event, bar) => {
    return db.find({ barcode: bar })
})
ipcMain.handle('itemCountBar', async (event, bar) => {
    return db.count({ barcode: bar })
})

ipcMain.handle('getName', async (event, data) => {
    return db.find({ name: data })
})

ipcMain.handle('getId', async (event, name) => {
    return db.find({ name: name })
})


ipcMain.handle('getTax', async (event) => {
    return db.find({ type: 'tax' })
})
ipcMain.handle('insertTax', async (event, data) => {
    console.log(data)
    return db.insert(data, function (err, Newdata) {

    })
})


ipcMain.handle('getPay', async (event) => {
    return db.find({ type: 'payment' })
})

ipcMain.handle('getTransaction', async (event) => {
    return db.find({ type: 'transaction' })
})

ipcMain.handle('updateInventory', async (event, id, inv) => {
    return db.update({ _id: id }, { $set: { inventory: inv } }, {}, function (err, numReplaced) {

    });
})

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

ipcMain.handle('addTransaction', async (event, data) => {
    console.log(data)
    return db.insert(data, function (err, Newdata) {

    })
})


ipcMain.handle('registerKey', async (event, data) => {
    return db.insert(data, function (err, Newdata) {

    })
})


ipcMain.handle('validateKey', async (event, data) => {
    return db.find({type:'license', license:data },  {}, function (err, numReplaced) {

    });
})

ipcMain.handle('deleteTransaction', async (event, id) => {

    return db.remove({ _id: id }, {}, function (err, numRemoved) {
    });

})

ipcMain.handle('getTransac', async (event, id) => {

    return db.find({ _id: id },{
    });

})