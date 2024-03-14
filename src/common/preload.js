const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('serialport', {
    getSerialports: () => ipcRenderer.invoke('getSerialports'),
    writeSerialport: (port, baudrate, data) => ipcRenderer.invoke('writeSerialport', port, baudrate, data)
});