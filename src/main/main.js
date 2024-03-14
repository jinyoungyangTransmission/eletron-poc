const { app, session } = require('electron');
const createWindow = require('./window');
require('./serialport')

app.on('ready', ()=>{
    session.defaultSession.clearCache();
    createWindow();
});