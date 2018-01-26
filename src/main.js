require('dotenv').config();
const path = require('path');
const url = require('url');
const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const Store = require('electron-store');
const keys = require('./config/keys');

//Dropbox
const TransformStream = require('./dropboxControllers/transform');
const DropboxUploadStream = require('./dropboxControllers/dropbox');

const fs = require('fs');
const Dropbox = require('dropbox');

var dropboxApiKey = '';

const store = new Store();

let mainWindow;

//Crea ventana principal
app.on('ready', createWindow);

//Config ventana principal
function createWindow(){

  if(process.env.DEV_URL){
    console.log('In development mode, charge backend in ',process.env.DEV_API_URL,' server');
    console.log('startUrl: ',process.env.DEV_URL);
    store.set('apiUrl', process.env.DEV_API_URL);
  }else{
    console.log('In production mode, charge backend in http://localhost:5000/ server');
    console.log('startUrl: ',__dirname, '/../build/index.html');
    store.set('apiUrl', 'http://localhost:5000/');
  }

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 850,
    icon: __dirname + '/img/favicon.ico'
  });
  mainWindow.maximize();

  const startUrl = process.env.DEV_URL ||
	url.format({
	  pathname: path.join(__dirname, '/../build/index.html'),
	  protocol: 'file:',
	  slashes: true
	});
	mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => mainWindow = null);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(mainMenu);

}

//Config ventana de configuracion
function createconfigWindow() {
  configWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Config',
    minimizable: false,
    maximizable: false
  });
  const startUrl = url.format({
      pathname: path.join(__dirname, '/../build/config.html'),
      protocol: 'file:',
      slashes: true
    });
  configWindow.loadURL(startUrl);
  if(process.env.NODE_ENV === 'production'){  //Quita el menu de la ventana en caso de estar en PROD
    configWindow.setMenu(null);
  }
  configWindow.on('closed', async () => {  //cuando se cierra la ventana
    configWindow = null; //Apuntamos la referencia a null y javascript limpia la memoria de la ventana anteriro.
  });
}

//Antes de cerrar el programa
app.on('before-quit', () => {
  store.delete('token');
});

//Cierra programa
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

//-----------------Eventos de comunicacion------------------//

//Guarda token
ipcMain.on('newToken', (event, token) => {
  store.set('token', token);
});

//Lee el token de memoria
ipcMain.on('getToken', (event) => {
    event.sender.send('getToken', store.get('token'));
});

//lee la url de la api de la memoria
ipcMain.on('getApiUrl', (event) => {
    event.sender.send('getApiUrl', store.get('apiUrl'));
});

//Cambia la url de la API
ipcMain.on('changeApiUrl', (event, url) => {
    store.set('apiUrl', url);
    mainWindow.webContents.send('newApiUrl', store.get('apiUrl'));
});

//sube un nuevo fichero
ipcMain.on('uploadFile', (event, fileInput, proyectId) => {

    let path = fileInput[0].path.replace(/([^:]\/)\/+/g, "$1");
    let name = fileInput[0].name.slice(0, -4);
    let nameCut = name.substring(0, 100);

    mainWindow.webContents.send('openUploadFileWindow');

    let file = fs.createReadStream(path);
    const transformStream = new TransformStream({chunkSize: 8000 * 1024 /* ~8MB */});

    const dropbox = new Dropbox({ accessToken: dropboxApiKey });

    const dropboxUpload = new DropboxUploadStream(
      null,
      "/graningportaldb/" + proyectId + "/" + name + "-" + proyectId + ".zip",
      dropbox,
      mainWindow,
      proyectId
    );

    dropbox.filesDeleteV2({path: '/graningportaldb/'+proyectId }).then((res) => {
      console.log('Fichero eliminado');
    }).catch((err) => {
      //console.log('Erorr eliminando fichero', err);
    }).finally(() =>{

      file.pipe(transformStream).pipe(dropboxUpload)
    	.on('error', (err) => {
    		console.log('Erorr subiendo fichero', err);
        mainWindow.webContents.send('fileUpdateError');
    	})
    	.on('finish', () => {
    		console.log('Fin de pipe');
    	});

    });

});

//Elimina un fichero
ipcMain.on('deleteFile', (event, projectId) => {
  dropbox.filesDeleteV2({path: '/graningportaldb/'+ projectId }).then((res) => {
    console.log('Fichero eliminado');
  }).catch((err) => {
    //console.log('Erorr eliminando fichero', err);
  });
});

//Setea la api key de dropbox
ipcMain.on('setDropboxKey', (event, dropboxKey) => {
  dropboxApiKey = dropboxKey;
});

//--------------Menu--------------//

//Template del menu
//TODO: Quitar debug de production
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Config',
        click() { createconfigWindow(); }
      },
      {
        label: 'LogOut',
        click() { logOut(); }
      },
      {
        label: 'DEVELOPER',
        submenu: [
          {
            label: 'Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          },
          {
            role: 'reload'
          }
        ]
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){ app.quit(); }
      }
    ]
  }
];

//Compatibilidad menu para MAC
if (process.platform === 'darwin'){
  menuTemplate.unshift({});
}

//Evento de menu de LogOut
function logOut(){
  store.delete('token');
  mainWindow.webContents.send('logOut');
}
