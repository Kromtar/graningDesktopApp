//Controla el estado de la ventana de detalle de proyectos
import { WINDOWPROJECTTAB} from '../actions/types';

export default function(state = 'list' , action) {
  switch (action.type){
    case WINDOWPROJECTTAB:
      return action.payload;
    default:
      return state;
  }
}
