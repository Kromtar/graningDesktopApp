//Almacena la lista de cleintes
import { FECTH_CLIENTS } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case FECTH_CLIENTS:
      return action.payload;
    default:
      return state;
  }
}
