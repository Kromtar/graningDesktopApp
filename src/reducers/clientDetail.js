//Almacena los detalles de un cliente y los puede modifica
import { FETCH_CLIENTDETAIL } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case FETCH_CLIENTDETAIL:
      return action.payload;
    default:
      return state;
  }
}
