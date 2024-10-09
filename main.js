// main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');


// Function that will be triggered from the HTML button
 
function handleButtonClick() {
    try {
      const device = new escpos.USB(); // For USB-based thermal printers
      const printer = new escpos.Printer(device);
      
      device.open(function (error) {
        if (error) {
          console.error('Printer connection error: ', error);
          return;
        }
  
        printer
          .font('a')
          .align('ct')
          .style('bu')
          .size(1, 1)
          .text('Receipt Header')
          .text('----------------------')
          .align('lt')
          .text('Item 1         $10')
          .text('Item 2         $15')
          .text('Total:         $25')
          .text('----------------------')
          .align('ct')
          .text('Thank you!')
          .cut()
          .close();
      });
    } catch (err) {
      console.error('Error printing receipt: ', err);
    }
  }
// Create the main window
function createWindow() {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,   // Set to true for security
        enableRemoteModule: false, // Optional but recommended
        nodeIntegration: false,   // Disable nodeIntegration
      },
    });

  win.loadFile('index.html');
}

// This will handle the event from the renderer process
ipcMain.on('button-click', (event) => {
  handleButtonClick();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
