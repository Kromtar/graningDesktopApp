import axios from 'axios';
import { TEST } from './types';

export const test = () => async dispatch => {
    const res = await axios.get('/api/testOpen');
    console.log(res);
    dispatch({ type: TEST, payload: 'test' });
};
