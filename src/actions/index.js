import axios from 'axios';
import { TEST, LOGIN_USER } from './types';
const electron = window.require("electron");

export const test = () => async dispatch => {
    const res = await axios.get('/api/testOpen');
    console.log(res);
    dispatch({ type: TEST, payload: 'test' });
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
