import axios from 'axios';
import { TEST, LOGIN_USER, APIURL } from './types';
const electron = window.require("electron");

//Tets URL de la API que no requiere token
export const testOpen = () => async (dispatch, getState) => {
    const res = await axios.get(`${getState().apiUrl}api/testOpen`);
    console.log(res);
    dispatch({ type: TEST, payload: 'test' });
};

//Test URL de la API que si requiere token y se ocupara para probar que respuesta negativa
export const testCloseFail = () => async (dispatch, getState) => {
    const res = await axios.get(`${getState().apiUrl}api/testClose`);
    console.log(res);
    dispatch({ type: TEST, payload: 'test' });
};

//Test URL de la API que si requiere token y se ocupara para probar el acceso positivo
export const testCloseOk = () => async (dispatch, getState) => {
    //Pregunndo a electron por el token almacenado en memoria
    new Promise(resolve => {
        electron.ipcRenderer.send('getToken', 'getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
            resolve(result);
        })
    }).then( async function(token){
      //Si tenemos el token guardado, enviamos la peticion a la API de test
      try {
        const res = await axios.get(`${getState().apiUrl}api/testClose`, { headers: { auth: token } });
        console.log(res);
        dispatch({ type: TEST, payload: 'test' });
      } catch (err) {
        //TODO:Manejo de error con mensaje
        console.log(err);
      }
    }).catch(function(err){
      //TODO:Error al consultar a electron
      console.log(err);
    });
};

//Login de Usuario a la API
export const loginUser = (credentials) => async (dispatch, getState) => {
    credentials.getToken = true; //TODO: Momentaneo para que la API nos retorne un Token y no el objeto de usuario
    try {
      const res = await axios.post(`${getState().apiUrl}api/loginUser`, credentials);
      //Guarda el token en electron
      electron.ipcRenderer.send('newToken', res.data.token);
      dispatch({ type: LOGIN_USER, payload: true });
    } catch (err) {
      console.log(err);
      //TODO:Manejo de error con mensaje
    }
};

//LogOut de usuario
export const logOutUser = () => dispatch => {
  dispatch({ type: LOGIN_USER, payload: false });
};

//Consulta a la API para validar token
export const checkToken = () => async (dispatch, getState) => {
  //Pregunndo a electron por el token
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //Conusulta por validez
        const res = await axios.get(`${getState().apiUrl}api/validateToken`, { headers: { auth: token } });
        if(res.data.status){
          dispatch({ type: LOGIN_USER, payload: true });
        }
      } catch (err) {
        //TODO: Manejo de error con mensaje
        //      Que pasa si no tenemos token guardado ? Que pasa si el token esta vencido ? Que pasa si el token es malo ?
        console.log('Error validando token', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//Consulta a electron por la URL de la API
export const checkApiUrl= () => async dispatch => {
  //Pregunndo por la URL de la API
  new Promise(resolve => {
      electron.ipcRenderer.send('getApiUrl')
      electron.ipcRenderer.on('getApiUrl', (event, result) => {
          resolve(result);
      })
  }).then(function(apiUrl){
      dispatch({ type: APIURL, payload: apiUrl });
  }).catch(function(err){
    //TODO: Error al consultar a electron
    console.log(err);
  });
};
