//Almacena los detalles de un proyecto y no los modifica
import { FETCH_PROJECTDETAIL_STATIC } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case FETCH_PROJECTDETAIL_STATIC:
      return action.payload;
    default:
      return state;
  }
}
