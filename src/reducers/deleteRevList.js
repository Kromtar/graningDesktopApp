//Almacena la lista de id de rev que se van a eliminar
import { ADD_REVID_FOR_DELETE, CLEAR_REVID_FOR_DELETE } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case ADD_REVID_FOR_DELETE:
      return [...state, action.payload ];
    case CLEAR_REVID_FOR_DELETE:
      return [];
    default:
      return state;
  }
}
