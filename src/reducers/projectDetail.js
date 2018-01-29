//Almacena los detalles de un proyecto
import { FETCH_PROJECTDETAIL, NEW_EDIT_REV, COPY_PROJECTDETAILSTATIC_TO_PROJECTDETAIL } from '../actions/types';
import update from 'react-addons-update';


//TODO: Realizar un refactor y hacer map con index para manejo de informacion (paquete externo npm para esto)

export default function(state = [] , action) {
  switch (action.type){
    case FETCH_PROJECTDETAIL:
      return action.payload;
    case COPY_PROJECTDETAILSTATIC_TO_PROJECTDETAIL:
      return action.payload;
    case NEW_EDIT_REV:
      return update(state, {
        _stage: {
          [action.payload.stageIndex]: {
            _review: {
              [action.payload.revIndex]: {
                name: {$apply: (prev) => {
                  if(typeof(action.payload.data.name) !== "undefined"){
                    return action.payload.data.name;
                  };
                  return prev;
                }},
                companytoclientdate: {$apply: (prev) => {
                  if(typeof(action.payload.data.companytoclientdate) !== "undefined"){
                    if(action.payload.data.companytoclientdate){
                      return action.payload.data.companytoclientdate.format('YYYY/MM/DD');
                    }
                    return null;
                  };
                  return prev;
                }},
                clienttocompany: {$apply: (prev) => {
                  if(typeof(action.payload.data.clienttocompany) !== "undefined"){
                    if(action.payload.data.clienttocompany){
                      return action.payload.data.clienttocompany.format('YYYY/MM/DD');
                    }
                    return null;
                  };
                  return prev;
                }},
              }
            }
          }
        }
      });
    default:
      return state;
  }
}
