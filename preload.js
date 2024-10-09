const { contextBridge, ipcRenderer } = require('electron');

// Expose IPC to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  onButtonClick: () => ipcRenderer.send('button-click'),
});
