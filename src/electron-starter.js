const electron = require('electron');
require('dotenv').config()
const url = require('url')
const path = require("path")




const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    const staticFilesURL =  url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    const {ELECTRON_URL} = process.env
    const initialURL = ELECTRON_URL || staticFilesURL
    console.log(initialURL)
    mainWindow.loadURL(initialURL)
    
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
   if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});