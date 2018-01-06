import axios from 'axios';
import { FETCH_PROJECTS } from './types';
const electron = window.require("electron");

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
