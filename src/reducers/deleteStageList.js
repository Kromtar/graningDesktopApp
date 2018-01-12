//Almacena la lista de id de etapas que se van a eliminar
import { ADD_STAEGEID_FOR_DELETE, CLEAR_STAEGEID_FOR_DELETE } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case ADD_STAEGEID_FOR_DELETE:
      return [...state, action.payload ];
    case CLEAR_STAEGEID_FOR_DELETE:
      return [];
    default:
      return state;
  }
}
