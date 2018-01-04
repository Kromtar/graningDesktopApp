import axios from 'axios';
import { TEST, LOGIN_USER, APIURL } from './types';
const electron = window.require("electron");

export const testOpen = () => async (dispatch, getState) => {
    const res = await axios.get(`${getState().apiUrl}api/testOpen`);
    console.log(res);
    dispatch({ type: TEST, payload: 'test' });
};

export const testCloseFail = () => async (dispatch, getState) => {
    const res = await axios.get(`${getState().apiUrl}api/testClose`);
    console.log(res);
    dispatch({ type: TEST, payload: 'test' });
};

export const testCloseOk = () => async (dispatch, getState) => {

    //Pregunndo a electron por el token
    new Promise(resolve => {
        electron.ipcRenderer.send('getToken', 'getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
            resolve(result);
        })
    }).then( async function(token){

      //Si tenemos la token desde electron, enviamos la peticion a la API
      try {
        const res = await axios.get(`${getState().apiUrl}api/testClose`, { headers: { auth: token } });
        console.log(res);
        dispatch({ type: TEST, payload: 'test' });
      } catch (err) {

        //Manejo de error con mensaje
        console.log(err);

      }

    }).catch(function(err){
      //Error al consultar a electron
      console.log(err);
    });
};

//Login de usuario
export const loginUser = (credentials) => async (dispatch, getState) => {
    credentials.getToken = true; //TODO: Momentaneo
    try {
      const res = await axios.post(`${getState().apiUrl}api/loginUser`, credentials);
      electron.ipcRenderer.send('newToken', res.data.token); //Envia token a electron
      dispatch({ type: LOGIN_USER, payload: true });
    } catch (err) {
      console.log(err);
      //Manejo de error con mensaje
    }
};

//LogOut de usuario
export const logOutUser = () => dispatch => {
  dispatch({ type: LOGIN_USER, payload: false });
};

//Ve si hay guardad una token
export const checkToken = () => async (dispatch, getState) => {

  //Pregunndo a electron por el token
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //Ve si el token es valido
        const res = await axios.get(`${getState().apiUrl}api/validateToken`, { headers: { auth: token } });
        if(res.data.status){
          dispatch({ type: LOGIN_USER, payload: true });
        }
      } catch (err) {
        //Manejo de error con mensaje
        console.log('Error validando token', err);
      }
  }).catch(function(err){
    //Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });

};

export const checkApiUrl= () => async dispatch => {

  //Pregunndo por la ip de la API
  new Promise(resolve => {
      electron.ipcRenderer.send('getApiUrl')
      electron.ipcRenderer.on('getApiUrl', (event, result) => {
          resolve(result);
      })
  }).then( async function(apiUrl){
      try {
        //Ve si el token es valido
        dispatch({ type: APIURL, payload: apiUrl });

      } catch (err) {
        //Manejo de error con mensaje
        console.log(err);
      }
  }).catch(function(err){
    //Error al consultar a electron
    console.log(err);
  });

};
