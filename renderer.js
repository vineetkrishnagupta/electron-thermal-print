const { ipcRenderer, contextBridge } = require('electron');

// Expose a function to the renderer process to communicate with the main process
contextBridge.exposeInMainWorld('electronAPI', {
  printReceipt: () => ipcRenderer.send('print-receipt')
});

// Handle the button click in the renderer process
window.onload = () => {
  const printButton = document.getElementById('printButton');
  
  printButton.addEventListener('click', () => {
    // Send a print request to the main process
    window.electronAPI.printReceipt();
  });
};
