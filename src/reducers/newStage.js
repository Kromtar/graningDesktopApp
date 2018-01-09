//Almacena una nueva stage
import { NEW_STAGE, CLEAR_NEW_STAGE, DELETE_TEMP_STAGE } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case NEW_STAGE:
      return [...state, action.payload ];
    case CLEAR_NEW_STAGE:
      return [];
    case DELETE_TEMP_STAGE:
      return state.filter( (item, index) => item.tempId !== action.payload );
    default:
      return state;
  }
}
