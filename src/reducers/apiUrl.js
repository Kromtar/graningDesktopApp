import { APIURL } from '../actions/types';

export default function(state = '' , action) {
  switch (action.type){
    case APIURL:
      return action.payload;
    default:
      return state;
  }
}
