//Archivo seleccionado para subir
import { ADD_FILE, REMOVE_FILE } from '../actions/types';

export default function(state = {} , action) {
  switch (action.type){
    case ADD_FILE:
      return action.payload;
    case REMOVE_FILE:
      return {};
    default:
      return state;
  }
}
