//Almacena las nuevas rev
import { NEW_REV, DELETE_TEMP_REV, CLEAR_NEW_REV } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case NEW_REV:
      return [...state, action.payload ];
    case DELETE_TEMP_REV:
      return state.filter( (item, index) => item.tempId !== action.payload );
    case CLEAR_NEW_REV:
      return [];
    default:
      return state;
  }
}
