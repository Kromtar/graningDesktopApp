//Almacena las rev a editar
import { NEW_EDIT_REV, CLEAR_EDIT_REV } from '../actions/types';
import update from 'react-addons-update';


export default function(state = {} , action) {
  switch (action.type){
    case NEW_EDIT_REV:
      var newState;
      //**En caso de no tener la Rev registrada para ser editada, se crea y llena con los valores iniciales**//
      if(typeof(state[action.payload.idRev]) === 'undefined'){
        state = update(state,
          {
            [action.payload.idRev]: {$set: {
              name: action.payload.originalData._stage[action.payload.stageIndex]._review[action.payload.revIndex].name,
              companytoclientdate: action.payload.originalData._stage[action.payload.stageIndex]._review[action.payload.revIndex].companytoclientdate,
              clienttocompany: action.payload.originalData._stage[action.payload.stageIndex]._review[action.payload.revIndex].clienttocompany,
            }}
          }
        );
      }

      newState = update(state,
        {
          [action.payload.idRev]: {$apply: function(prev) {
            //**Solo en caso de que vengan datos nuevos se remplaza el registro, sino se deja el dato anterior**//
            return ({
              name: typeof(action.payload.data.name) !== 'undefined' ? action.payload.data.name : prev.name,
              companytoclientdate: typeof(action.payload.data.companytoclientdate) !== 'undefined' ? action.payload.data.companytoclientdate : prev.companytoclientdate,
              clienttocompany: typeof(action.payload.data.clienttocompany) !== 'undefined' ? action.payload.data.clienttocompany : prev.clienttocompany
            });
          }}
        }
      );
      return newState;
    case CLEAR_EDIT_REV:
      return {};
    default:
      return state;
  }
}
