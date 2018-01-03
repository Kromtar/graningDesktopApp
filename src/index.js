import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import { LOGIN_USER } from './actions/types';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const electron = window.require("electron");

//Evento de logout
electron.ipcRenderer.on('logOut', (event) => {
  store.dispatch({ type: LOGIN_USER, payload: false });
});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
