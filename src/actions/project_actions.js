import axios from 'axios';
import { FETCH_PROJECTS, WINDOWPROJECTTAB, FETCH_PROJECTDETAIL, FETCH_PROJECT_USERS } from './types';
const electron = window.require("electron");

//Consulta a la API por la lista de todos los proyectos
export const fetchProjects = () => async (dispatch, getState) => {
  //Pregunndo a electron por el token
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {

        const res = await axios.get(`${getState().apiUrl}api/allProjects`, { headers: { auth: token } });

        dispatch({ type: FETCH_PROJECTS, payload: res.data });

      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//Crea un nuevo proyecto
export const createNewProject = (data) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //TODO: Manejo de consultas fallidas ?
        const res = await axios.post(`${getState().apiUrl}api/createProject`, data.values, { headers: { auth: token } });
      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//Busca el detalle de un projecto
export const getProjectDetail = (data) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //TODO: Manejo de consultas fallidas ?
        const resP = await axios.get(`${getState().apiUrl}api/getProjectDetail`, { headers: { auth: token, id: data } });

        console.log(resP.data);

        dispatch({ type: FETCH_PROJECTDETAIL, payload: resP.data });

        const resU = await axios.get(`${getState().apiUrl}api/getClientsFromProject`, { headers: { auth: token, id: data } });

        dispatch({ type: FETCH_PROJECT_USERS, payload: resU.data });

        dispatch({ type: WINDOWPROJECTTAB, payload: 'detail' });

      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//Edita el contenido principal de un proyecto
export const editProjectGeneral = (data) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //TODO: Manejo de consultas fallidas ?
        console.log(data.values);
        //const res = await axios.post(`${getState().apiUrl}api/createProject`, data.values, { headers: { auth: token } });
      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};
