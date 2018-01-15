//Almacena la id del projecto donde hay que eliminar el file
import { ADD_FILE_TO_DELETE, CLEAR_FILE_TO_DELETE } from '../actions/types';

export default function(state = '' , action) {
  switch (action.type){
    case ADD_FILE_TO_DELETE:
      return action.payload;
    case CLEAR_FILE_TO_DELETE:
      return '';
    default:
      return state;
  }
}
