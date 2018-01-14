import 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css';
import 'react-table/react-table.css';
import 'react-datepicker/dist/react-datepicker.css';
import './customStyle/customStyle.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

import { LOGIN_USER, APIURL, WINDOWUPLOADCONSOLE, WINDOWUPLOADCONSOLE_ADDCHUNK } from './actions/types';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const electron = window.require("electron");

//Evento directo LogOut de electron
electron.ipcRenderer.on('logOut', (event) => {
  store.dispatch({ type: LOGIN_USER, payload: false });
});

//Evento directo de cambio de ApiUrl de electron
electron.ipcRenderer.on('newApiUrl', (event, apiUrl) => {
  store.dispatch({ type: APIURL, payload: apiUrl });
});

//Evento abrir ventana de upload file
electron.ipcRenderer.on('openUploadFileWindow', (event) => {
  console.log('open');
  store.dispatch({ type: WINDOWUPLOADCONSOLE, payload: {state: 'open', content: 'uploading'} });
});

//Evento se ejecuta cunado el archivo se termina de subir
electron.ipcRenderer.on('endUploadFile', (event) => {
  console.log('End Upload File');
  store.dispatch({ type: WINDOWUPLOADCONSOLE, payload: {content: 'pauseForLink', progress: 100} });
});

//Evento se ejecuta cunado se genera el link de descarga
electron.ipcRenderer.on('shareLinkGenerate', (event, data) => {
  console.log('Share link generate', data);
  store.dispatch({ type: WINDOWUPLOADCONSOLE, payload: {content: 'linkReady', link: data} });
});

//Evento se genera cunado se detecta algun problema en el proceso de subir el fichero
electron.ipcRenderer.on('fileUpdateError', (event) => {
  console.log('Error al subir el archivo');
  //store.dispatch({ type: WINDOWUPLOADCONSOLE, payload: {state: 'open'} });
});

//Evento se genera cunado se sube un nuevo chunk de data
electron.ipcRenderer.on('newChunkUpdate', (event, data) => {
  store.dispatch({ type: WINDOWUPLOADCONSOLE_ADDCHUNK, payload: data });
});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
