const path = require('path');
const url = require('url');
const {app, BrowserWindow, ipcMain} = require('electron');
const Store = require('electron-store');

const store = new Store();

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({ width: 800, height: 600});
    const startUrl = process.env.DEV_URL ||
		url.format({
		  pathname: path.join(__dirname, '/../build/index.html'),
		  protocol: 'file:',
		  slashes: true
		});
	mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

//salva token de front
ipcMain.on('newToken', (event, token) => {
  //Guarda token en memoria
  store.set('token', token);
});
