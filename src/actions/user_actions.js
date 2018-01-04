import axios from 'axios';
import { LOGIN_USER } from './types';
const electron = window.require("electron");

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
