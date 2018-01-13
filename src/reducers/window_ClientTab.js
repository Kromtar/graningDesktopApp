//Controla el estado de la ventana de clientes
import { WINDOWCLIENTTAB} from '../actions/types';

export default function(state = 'list' , action) {
  switch (action.type){
    case WINDOWCLIENTTAB:
      return action.payload;
    default:
      return state;
  }
}
