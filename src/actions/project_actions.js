import axios from 'axios';
import _ from 'lodash';
import {
  FETCH_PROJECTS,
  WINDOWPROJECTTAB,
  FETCH_PROJECTDETAIL,
  FETCH_PROJECTDETAIL_STATIC,
  FETCH_PROJECT_USERS,
  NEW_STAGE,
  DELETE_TEMP_STAGE,
  ADD_STAEGEID_FOR_DELETE,
  NEW_REV,
  DELETE_TEMP_REV,
  ADD_REVID_FOR_DELETE,
  NEW_EDIT_REV,
  UPDATE_EDIT_REV_MODAL,
  ADD_FILE,
  REMOVE_FILE,
  WINDOWUPLOADCONSOLE,
  WINDOWUPLOADCONSOLE_RESET
} from './types';

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

        dispatch({ type: FETCH_PROJECTDETAIL, payload: resP.data });
        dispatch({ type: FETCH_PROJECTDETAIL_STATIC, payload: resP.data });

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
export const editProjectGeneral = (id, data) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //TODO: Manejo de consultas fallidas ?
        await axios.put(`${getState().apiUrl}api/updateProjectGeneral`, data.values, { headers: { auth: token, id: id } });

      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//Añade temporalmente una nueva estapa
export const tempNewStage = (stageName, tempId) => (dispatch) => {
  dispatch({ type: NEW_STAGE, payload: {name: stageName, tempId: tempId} });
};

//Elimina una stage temporal y su contenido
export const deleteTempStage = (tempId) => (dispatch) => {
  dispatch({ type: DELETE_TEMP_STAGE , payload: tempId });
  //TODO: Eliminar contenido de stage eliminada
};

//Añadir etapa al proyecto
export const addStageToProject = (id) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {

        //TODO: Manejo de consultas fallidas ?
        await axios.put(`${getState().apiUrl}api/addStageToProject`, getState().newStage, { headers: { auth: token, id: id } });

      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//añade id de etapas para ser eliminadas a un temporal
export const addStageidForDelete = (idStage) => (dispatch, getState) =>{
  dispatch({ type: ADD_STAEGEID_FOR_DELETE , payload: idStage });
};

//elimina etapas de un proyecto
export const deleteStageFromProject = (idProject) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //TODO: Manejo de consultas fallidas ?
        await axios.put(`${getState().apiUrl}api/deleteStageFromProject`, getState().deleteStageList, { headers: { auth: token, id: idProject } });

      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//añadir rev a una etapa nueva o antigua
export const tempNewRev = (data, tempId ,stageId ) => (dispatch) => {
  dispatch({ type: NEW_REV, payload: {data: data, tempId: tempId, stageId: stageId} });
};

export const addRevToProject = (id) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        const data = getState().newRev;

        const revsWhitoutTempId =_.map(data, e => _.pick(e, ['data', 'stageId']));

        //TODO: Manejo de consultas fallidas ?
        await axios.put(`${getState().apiUrl}api/addRevsToProject`, revsWhitoutTempId, { headers: { auth: token, id: id } });

      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//Elimina una rev temporal
export const deleteTempRev = (tempId) => (dispatch) => {
  dispatch({ type: DELETE_TEMP_REV , payload: tempId });
};

//añade id de rev para ser eliminadas a un temporal
export const addRevidForDelete = (idRev, IdStage) => (dispatch, getState) =>{
  dispatch({ type: ADD_REVID_FOR_DELETE , payload: {idStage: IdStage, idRev: idRev} });
};

//elimina rev de un proyecto
export const deleteRevFromProject = (idProject) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //TODO: Manejo de consultas fallidas ?
        await axios.put(`${getState().apiUrl}api/deleteRevFromProject`, getState().deleteRevList, { headers: { auth: token, id: idProject } });

      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//añade id de rev para ser editada
export const addRevForEdit = (idRev, IdStage,stageIndex,revIndex, data) => (dispatch, getState) =>{
  dispatch({ type: NEW_EDIT_REV , payload: {
    idStage: IdStage,
    idRev: idRev,
    stageIndex: stageIndex,
    revIndex: revIndex,
    data: data,
    originalData: getState().projectDetail}
  });
};


//editar rev de una etapa antigua
export const editRevsFromProyect = (idProject) => async (dispatch, getState) =>{
  new Promise(resolve => {
      electron.ipcRenderer.send('getToken')
      electron.ipcRenderer.on('getToken', (event, result) => {
          resolve(result);
      })
  }).then( async function(token){
      try {
        //TODO: Manejo de consultas fallidas ?
        await axios.put(`${getState().apiUrl}api/editRevFromProject`, getState().editRev, { headers: { auth: token, id: idProject } });

      } catch (err) {
        //TODO: Manejo de error con mensaje
        console.log('Error en peticion', err);
      }
  }).catch(function(err){
    //TODO:Error al consultar a electron
    console.log('Error interactuando con electron', err);
  });
};

//camiar nombre de etapa antigua

//añadir rev a etapa temporal**cuestioable

//Añedi un archivo para subir
export const addFile = (video) => dispatch => {
  dispatch({ type: ADD_FILE, payload: { ...video } });
};

//Remueve el archivo para subir
export const removeFile = () => dispatch => {
  dispatch({ type: REMOVE_FILE});
};

//Inicia la subida del nuevo Fichero
export const uploadNewFile = (proyectId) => (dispatch, getState) => {
  const fileInfo = getState().fileSelected;
  electron.ipcRenderer.send('uploadFile', fileInfo, proyectId);
  dispatch({ type: WINDOWUPLOADCONSOLE, payload: { fileSize: fileInfo[0].size }});
};

//Guarda el link de descarga en el proyecto
export const sendLinkProject = () => async (dispatch, getState) =>{

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
    const data = getState().window_UploadConsole.link;
    
    const res = await axios.post(`${getState().apiUrl}api/addLinkToPtoject`, data, { headers: { auth: token } });

    dispatch({ type: WINDOWUPLOADCONSOLE, payload: {
      content: 'finished',
      fileSize: '',
      link: ''
    }});

    dispatch({ type: REMOVE_FILE });

  } catch (err) {
    console.log(err);
  }
};

//Cierra la ventana de fileUpload
export const closeWindowUploadConsole = () => async (dispatch, getState) =>{
  dispatch({ type: WINDOWUPLOADCONSOLE_RESET });
}
