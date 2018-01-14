import axios from 'axios';
import {
  LOGIN_USER,
  FECTH_CLIENTS,
  WINDOWCLIENTTAB,
  FETCH_CLIENTDETAIL_STATIC,
  FETCH_CLIENTDETAIL
} from './types';
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
      console.log(err); //TODO:Manejo de error con mensaje
    }
};

//LogOut de usuario
export const logOutUser = () => dispatch => {
  dispatch({ type: LOGIN_USER, payload: false });
};

//Consulta a la API para validar token
export const checkToken = () => async (dispatch, getState) => {

  function getToken(){
    return new Promise(resolve => {
        electron.ipcRenderer.send('getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
        })
    });
  }

  try {
    const token = await getToken();
    const res = await axios.get(`${getState().apiUrl}api/validateToken`, { headers: { auth: token } });

    if(res.data.status){
      dispatch({ type: LOGIN_USER, payload: true });
    }

  } catch (err) {
    console.log(err);
  }
};

//Consulta a la API por todos los usuarios
export const fetchClients = () => async (dispatch, getState) =>{

  function getToken(){
    return new Promise(resolve => {
        electron.ipcRenderer.send('getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
        })
    });
  }

  try {
    const token = await getToken();
    const res = await axios.get(`${getState().apiUrl}api/allClients`, { headers: { auth: token } });

    dispatch({ type: FECTH_CLIENTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

//Crea un nuevo usuario
export const createNewUser = (data) => async (dispatch, getState) =>{

  function getToken(){
    return new Promise(resolve => {
        electron.ipcRenderer.send('getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
        })
    });
  }

  try {
    const token = await getToken();
    const res = await axios.post(`${getState().apiUrl}api/createUser`, data.values, { headers: { auth: token } });
  } catch (err) {
    console.log(err);
  }
};

//Busca el detalle de un projecto
export const getClientDetail = (data) => async (dispatch, getState) =>{

  function getToken(){
    return new Promise(resolve => {
        electron.ipcRenderer.send('getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
        })
    });
  }

  try {
    const token = await getToken();
    const resU = await axios.get(`${getState().apiUrl}api/getClientDetail`, { headers: { auth: token, id: data } });

    dispatch({ type: FETCH_CLIENTDETAIL, payload: resU.data });
    dispatch({ type: FETCH_CLIENTDETAIL_STATIC, payload: resU.data });
    dispatch({ type: WINDOWCLIENTTAB, payload: 'detail' });

  } catch (err) {
    console.log(err);
  }
};

//Añade un projecto a un usuario
export const addProjectToClient = (data) => async (dispatch, getState) =>{

  function getToken(){
    return new Promise(resolve => {
        electron.ipcRenderer.send('getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
        })
    });
  }

  try {
    const token = await getToken();
    const res = await axios.put(`${getState().apiUrl}api/addProjectToClient`, data, { headers: { auth: token } });
  } catch (err) {
    console.log(err);
  }

};

//Remueve un proyecto de un cliente
export const removeProjectToClient = (clientId, projectId) => async (dispatch, getState) =>{

  const data = {
    clientId: clientId,
    projectId: projectId
  };

  function getToken(){
    return new Promise(resolve => {
        electron.ipcRenderer.send('getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
        })
    });
  }

  try {
    const token = await getToken();
    const res = await axios.put(`${getState().apiUrl}api/removeProjectToClient`, data, { headers: { auth: token } });
  } catch (err) {
    console.log(err);
  }
};
