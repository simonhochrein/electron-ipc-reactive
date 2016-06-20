var ipcMain = require('electron').ipcMain;
var BrowserWindow = require('electron').BrowserWindow;
ipcMain.on('IPCVarChanged', function(e,v){
  BrowserWindow.getAllWindows().forEach(function(val){
    val.webContents.send('IPCVarChanged',v);
  });
});
