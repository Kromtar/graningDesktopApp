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
  WINDOWUPLOADCONSOLE_RESET,
  ADD_FILE_TO_DELETE
} from './types';

const electron = window.require("electron");

//Consulta a la API por la lista de todos los proyectos
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
export const createNewProject = (data) => async (dispatch, getState) =>{

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
    const res = await axios.post(`${getState().apiUrl}api/createProject`, data.values, { headers: { auth: token } });

  } catch (err) {
    console.log(err);
  }
};

//Busca el detalle de un projecto
export const getProjectDetail = (data) => async (dispatch, getState) =>{

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
    const resP = await axios.get(`${getState().apiUrl}api/getProjectDetail`, { headers: { auth: token, id: data } });
    const resU = await axios.get(`${getState().apiUrl}api/getClientsFromProject`, { headers: { auth: token, id: data } });

    dispatch({ type: FETCH_PROJECTDETAIL, payload: resP.data });
    dispatch({ type: FETCH_PROJECTDETAIL_STATIC, payload: resP.data });
    dispatch({ type: FETCH_PROJECT_USERS, payload: resU.data });
    dispatch({ type: WINDOWPROJECTTAB, payload: 'detail' });

  } catch (err) {
    console.log(err);
  }
};


//Edita el contenido principal de un proyecto
export const editProjectGeneral = (id, data) => async (dispatch, getState) =>{

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
    await axios.put(`${getState().apiUrl}api/updateProjectGeneral`, data.values, { headers: { auth: token, id: id } });

  } catch (err) {
    console.log(err);
  }
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
    await axios.put(`${getState().apiUrl}api/addStageToProject`, getState().newStage, { headers: { auth: token, id: id } });

  } catch (err) {
    console.log(err);
  }
};

//añade id de etapas para ser eliminadas a un temporal
export const addStageidForDelete = (idStage) => (dispatch, getState) =>{
  dispatch({ type: ADD_STAEGEID_FOR_DELETE , payload: idStage });
};


//elimina etapas de un proyecto
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
    await axios.put(`${getState().apiUrl}api/deleteStageFromProject`, getState().deleteStageList, { headers: { auth: token, id: idProject } });

  } catch (err) {
    console.log(err);
  }
};

//añadir rev a una etapa nueva o antigua
export const tempNewRev = (data, tempId ,stageId ) => (dispatch) => {
  dispatch({ type: NEW_REV, payload: {data: data, tempId: tempId, stageId: stageId} });
};

//añade rev a un projecto
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
    const data = getState().newRev;
    const revsWhitoutTempId =_.map(data, e => _.pick(e, ['data', 'stageId']));
    await axios.put(`${getState().apiUrl}api/addRevsToProject`, revsWhitoutTempId, { headers: { auth: token, id: id } });

  } catch (err) {
    console.log(err);
  }
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
    await axios.put(`${getState().apiUrl}api/deleteRevFromProject`, getState().deleteRevList, { headers: { auth: token, id: idProject } });
  } catch (err) {
    console.log(err);
  }
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
    await axios.put(`${getState().apiUrl}api/editRevFromProject`, getState().editRev, { headers: { auth: token, id: idProject } });
  } catch (err) {
    console.log(err);
  }
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
    const name = getState().fileSelected[0].name;

    const res = await axios.post(`${getState().apiUrl}api/addLinkToPtoject`, {name, data}, { headers: { auth: token } });

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

//Añade una id de projecto donde se tiene que eliminar un projecto
export const addIdProjectForDeleteFile = (projecyId) => async (dispatch, getState) =>{
  dispatch({ type: ADD_FILE_TO_DELETE, payload: projecyId});
}

//Elimina un fichero desde un proyecto
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

    const res = await axios.post(`${getState().apiUrl}api/deleteLinkFromProject`, {projectId}, { headers: { auth: token } });

  } catch (err) {
    console.log(err);
  }
};

//Eliminar un proyecto
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
    await axios.post(`${getState().apiUrl}api/deleteProject`, {idProject}, { headers: { auth: token } });
  } catch (err) {
    console.log(err);
  }
};
