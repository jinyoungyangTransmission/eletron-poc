const { BrowserWindow, app } = require("electron");
const path = require('path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            preload: path.join(__dirname, '../common/preload.js')
        }
    })

    mainWindow.loadFile(path.join(__dirname,'../renderer/pages/index.html'));

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    app.on('window-all-closed', () => {
        app.quit();
    })
};

module.exports = createWindow;