//Almacena los detalles de un cliente y no los modifica
import { FETCH_CLIENTDETAIL_STATIC } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case FETCH_CLIENTDETAIL_STATIC:
      return action.payload;
    default:
      return state;
  }
}
