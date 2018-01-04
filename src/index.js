import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import { LOGIN_USER, APIURL } from './actions/types';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const electron = window.require("electron");

//Evento de logout
electron.ipcRenderer.on('logOut', (event) => {
  store.dispatch({ type: LOGIN_USER, payload: false });
});

//Evento nueva apiUrl
electron.ipcRenderer.on('newApiUrl', (event, apiUrl) => {
  console.log(apiUrl);
  store.dispatch({ type: APIURL, payload: apiUrl });
});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
