const { ipcMain, app } = require("electron");
const { SerialPort } = require("serialport");
const util = require('util');

const ipcHandlers = {
    async getSerialports() {
        var ports = await SerialPort.list();
        return ports;
    },
    async writeSerialport(event, _port, _baudrate, _data) {
        const port = new SerialPort({ path: _port.path, baudRate: _baudrate, autoOpen: false});

        const open = util.promisify(port.open.bind(port));
        const write = util.promisify(port.write.bind(port));
        const close = util.promisify(port.close.bind(port));
    
        try {
            await open();
            console.log('opened!');
    
            await write(_data);
            console.log('message written');
    
            await close();
            console.log('Port closed');
        } catch (err) {
            console.log('Error: ', err.message);
            return false;
        }

        return true;
    }
}

Object.entries(ipcHandlers).forEach(([channel, handler]) => {
    ipcMain.handle(channel, handler);
});

app.on('before-quit', () => {
    Object.entries(ipcHandlers).forEach(([channel]) => {
        ipcMain.removeHandler(channel);
    });
    ipcHandlers = undefined;
    port = undefined;
})