//Almacena los usuarios de un proyecto
import { FETCH_PROJECT_USERS } from '../actions/types';

export default function(state = [] , action) {
  switch (action.type){
    case FETCH_PROJECT_USERS:
      return action.payload;
    default:
      return state;
  }
}
