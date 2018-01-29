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
  ADD_FILE,
  REMOVE_FILE,
  WINDOWUPLOADCONSOLE,
  WINDOWUPLOADCONSOLE_RESET,
  ADD_FILE_TO_DELETE
} from './types';

const electron = window.require("electron");

//Consulta a la API por la lista de todos los proyectos disponibles
export const fetchProjects = () => async (dispatch, getState) =>{
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
    const res = await axios.get(`${getState().apiUrl}api/allProjects`, { headers: { auth: token } });
    dispatch({ type: FETCH_PROJECTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

//Crea un nuevo proyecto
export const createNewProject = ({values}) => async (dispatch, getState) =>{
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
    await axios.post(`${getState().apiUrl}api/createProject`, values, { headers: { auth: token } });
  } catch (err) {
    console.log(err);
  }
};

//Pide el detalle de un projecto
export const getProjectDetail = (id) => async (dispatch, getState) =>{
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
    const resProjectDetail = await axios.get(`${getState().apiUrl}api/getProjectDetail`, { headers: { auth: token, id }});
    const resUsersFromProject = await axios.get(`${getState().apiUrl}api/getClientsFromProject`, { headers: { auth: token, id }});
    dispatch({ type: FETCH_PROJECTDETAIL, payload: resProjectDetail.data });
    dispatch({ type: FETCH_PROJECTDETAIL_STATIC, payload: resProjectDetail.data });
    dispatch({ type: FETCH_PROJECT_USERS, payload: resUsersFromProject.data });
    dispatch({ type: WINDOWPROJECTTAB, payload: 'detail' });
  } catch (err) {
    console.log(err);
  }
};

//Edita el contenido general de un projecto
export const editProjectGeneral = (id, {values}) => async (dispatch, getState) =>{
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
    const data = { values, id };
    await axios.post(`${getState().apiUrl}api/updateProjectGeneral`, data, { headers: { auth: token }});
  } catch (err) {
    console.log(err);
  }
};

//Añade una etapa temporal
export const tempNewStage = (stageName, tempId) => (dispatch) => {
  dispatch({ type: NEW_STAGE, payload: {name: stageName, tempId: tempId} });
};

//Elimina una etapa temporal
export const deleteTempStage = (tempId) => (dispatch) => {
  dispatch({ type: DELETE_TEMP_STAGE , payload: tempId });
};

//Añade una nueva etapa a un proyecto
export const addStageToProject = (id) => async (dispatch, getState) =>{
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
    const data = { values: getState().newStage, id }
    await axios.post(`${getState().apiUrl}api/addStageToProject`, data, { headers: { auth: token} });

  } catch (err) {
    console.log(err);
  }
};

//Añade una id de proyecto para ser eliminada
export const addStageidForDelete = (idStage) => (dispatch, getState) =>{
  dispatch({ type: ADD_STAEGEID_FOR_DELETE , payload: idStage });
};

//Elimina etapas de un projecto
export const deleteStageFromProject = (idProject) => async (dispatch, getState) =>{
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
    const listOfStagesForDelete = getState().deleteStageList
    const data = {values: listOfStagesForDelete, id: idProject }
    await axios.post(`${getState().apiUrl}api/deleteStageFromProject`, data , { headers: { auth: token }});

  } catch (err) {
    console.log(err);
  }
};

//Añade un rev temporal
export const tempNewRev = (data, tempId ,stageId ) => (dispatch) => {
  dispatch({ type: NEW_REV, payload: {data: data, tempId: tempId, stageId: stageId} });
};

//Añade una rev a una stage
export const addRevToProject = (id) => async (dispatch, getState) =>{
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
    const newRevList = getState().newRev;
    const revsWhitoutTempId =_.map(newRevList, e => _.pick(e, ['data', 'stageId']));
    const data = { values: revsWhitoutTempId, id }
    await axios.post(`${getState().apiUrl}api/addRevsToProject`, data, { headers: { auth: token }});
  } catch (err) {
    console.log(err);
  }
};

//Elimina una rev temporal
export const deleteTempRev = (tempId) => (dispatch) => {
  dispatch({ type: DELETE_TEMP_REV , payload: tempId });
};

//Añade id de rev para ser eliminada
export const addRevidForDelete = (idRev, IdStage) => (dispatch, getState) =>{
  dispatch({ type: ADD_REVID_FOR_DELETE , payload: {idStage: IdStage, idRev: idRev} });
};

//Elimina revs de una stage
export const deleteRevFromProject = () => async (dispatch, getState) =>{
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
    const listOfRevForDelete = getState().deleteRevList;
    await axios.post(`${getState().apiUrl}api/deleteRevFromProject`, listOfRevForDelete, { headers: { auth: token }});
  } catch (err) {
    console.log(err);
  }
};

//Añade la id de una rev para ser editada
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

//Edita revisiones de etapas especificas
export const editRevsFromProyect = () => async (dispatch, getState) =>{
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
    const editRev = getState().editRev;
    await axios.post(`${getState().apiUrl}api/editRevFromProject`, editRev, { headers: { auth: token }});
  } catch (err) {
    console.log(err);
  }
};

//Añede un archivo para subir
export const addFile = (video) => dispatch => {
  dispatch({ type: ADD_FILE, payload: { ...video } });
};

//Remueve el archivo para subir actual
export const removeFile = () => dispatch => {
  dispatch({ type: REMOVE_FILE});
};

//Inicia la subida de un nuevo Fichero
export const uploadNewFile = (proyectId) => (dispatch, getState) => {
  const fileInfo = getState().fileSelected;
  //TODO: Detectar error en la subida de fichero
  electron.ipcRenderer.send('uploadFile', fileInfo, proyectId);
  dispatch({ type: WINDOWUPLOADCONSOLE, payload: { fileSize: fileInfo[0].size }});
};

//Guarda el link de descarga en el modelo del proyecto
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
    const name = getState().fileSelected[0].name;
    await axios.post(`${getState().apiUrl}api/addLinkToPtoject`, {name, data}, { headers: { auth: token } });
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

//Añade la id del projecto donde se tiene que eliminar un fichero
export const addIdProjectForDeleteFile = (projecyId) => async (dispatch, getState) =>{
  dispatch({ type: ADD_FILE_TO_DELETE, payload: projecyId});
}

//Elimina un fichero de un projecto
export const deleteFileFromproject = () => async (dispatch, getState) =>{
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
    const projectId = getState().deleteFileFromProject;
    //TODO: Agregar un callback para confirmar que se elimino
    electron.ipcRenderer.send('deleteFile', projectId);
    await axios.delete(`${getState().apiUrl}api/deleteLinkFromProject`, { headers: { auth: token, id: projectId } });
  } catch (err) {
    console.log(err);
  }
};

//Eliminar un proyecto, sus contenidos relacionados y el fichero
export const deleteProject = (idProject) => async (dispatch, getState) =>{
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
    //TODO: Agregar un callback para confirmar que se elimino
    electron.ipcRenderer.send('deleteFile', idProject);
    await axios.delete(`${getState().apiUrl}api/deleteProject`, { headers: { auth: token, id: idProject } });
  } catch (err) {
    console.log(err);
  }
};
