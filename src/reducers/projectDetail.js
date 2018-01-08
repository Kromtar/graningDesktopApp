//Almacena los detalles de un proyecto
import { FETCH_PROJECTDETAIL } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case FETCH_PROJECTDETAIL:
      return action.payload;
    default:
      return state;
  }
}
