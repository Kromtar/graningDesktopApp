//Almacena las rev a editar
import { NEW_EDIT_REV, CLEAR_EDIT_REV } from '../actions/types';
import update from 'react-addons-update';


export default function(state = {} , action) {
  switch (action.type){
    case NEW_EDIT_REV:
      var review = {};

      function name(){
        if(typeof(action.payload.data.name) === "undefined"){
          if(Object.keys(state).length > 0){
            return state[action.payload.idStage][action.payload.idRev].name;
          }else{
            return action.payload.originalData._stage[action.payload.stageIndex]._review[action.payload.revIndex].name;
          }
        }else{
          return action.payload.data.name;
        }
      }

      function companytoclientdate(){
        if(typeof(action.payload.data.companytoclientdate) === "undefined"){
          if(Object.keys(state).length > 0){
            return state[action.payload.idStage][action.payload.idRev].companytoclientdate;
          }else{
            return action.payload.originalData._stage[action.payload.stageIndex]._review[action.payload.revIndex].companytoclientdate;
          }
        }else{
          return action.payload.data.companytoclientdate;
        }
      }

      function clienttocompany(){
        if(typeof(action.payload.data.clienttocompany) === "undefined"){
          if(Object.keys(state).length > 0){
            return state[action.payload.idStage][action.payload.idRev].clienttocompany;
          }else{
            return action.payload.originalData._stage[action.payload.stageIndex]._review[action.payload.revIndex].clienttocompany;
          }
        }else{
          return action.payload.data.clienttocompany;
        }
      }

      review = state[action.payload.idStage] ? state[action.payload.idStage] : {};

      review[action.payload.idRev] = {
        name: name(),
        companytoclientdate: companytoclientdate(),
        clienttocompany: clienttocompany()
      }

      return update(state, { [action.payload.idStage]: {$set: review}});
    case CLEAR_EDIT_REV:
      return {};
    default:
      return state;
  }
}
