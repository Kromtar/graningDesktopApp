import { TEST } from '../actions/types';

export default function(state = '' , action) {
  switch (action.type){
    case TEST:
      return action;
    default:
      return state;
  }
}
