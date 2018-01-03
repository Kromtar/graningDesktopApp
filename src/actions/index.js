import axios from 'axios';
import { TEST, LOGIN_USER } from './types';
const electron = window.require("electron");

export const testOpen = () => async dispatch => {
    const res = await axios.get('/api/testOpen');
    console.log(res);
    dispatch({ type: TEST, payload: 'test' });
};

export const testCloseFail = () => async dispatch => {
    const res = await axios.get('/api/testClose');
    console.log(res);
    dispatch({ type: TEST, payload: 'test' });
};

export const testCloseOk = () => async dispatch => {

    //Pregunndo a electron por el token
    new Promise(resolve => {
        electron.ipcRenderer.send('getToken', 'getToken')
        electron.ipcRenderer.on('getToken', (event, result) => {
            resolve(result);
        })
    }).then( async function(token){

      //Si tenemos la token desde electron, enviamos la peticion a la API
      try {
        const res = await axios.get('/api/testClose', { headers: { auth: token } });
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

export const loginUser = (credentials, history) => async dispatch => {


    credentials.getToken = true; //TODO: Momentaneo

    try {
      const res = await axios.post('/api/loginUser', credentials);

      electron.ipcRenderer.send('newToken', res.data.token); //Envia token a electron

      dispatch({ type: LOGIN_USER, payload: true });

      history.push('/');

    } catch (err) {

      console.log(err);
      //Manejo de error con mensaje
    }


};
