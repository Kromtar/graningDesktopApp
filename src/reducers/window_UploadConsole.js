//Controla el estado de la ventana de subida de fichero
import { WINDOWUPLOADCONSOLE, WINDOWUPLOADCONSOLE_ADDCHUNK, WINDOWUPLOADCONSOLE_RESET} from '../actions/types';

export default function(state = { state: 'close', content: 'initial', progress: 0, fileSize: '', link: ''} , action) {
  switch (action.type){
    case WINDOWUPLOADCONSOLE:
      return {
        ...state,
        state: action.payload.state ? action.payload.state : state.state,
        content: action.payload.content ? action.payload.content : state.content,
        progress: action.payload.progress ? action.payload.progress : state.progress,
        fileSize: action.payload.fileSize ? action.payload.fileSize : state.fileSize,
        link: action.payload.link ? action.payload.link : state.link
      }
    case WINDOWUPLOADCONSOLE_ADDCHUNK:
      var chunkSize = action.payload;
      var fileSizeK = (state.fileSize / 1000)
      var addPercentage = (chunkSize * 100) / fileSizeK;
      var addPercentageRound = Math.round(addPercentage);
      var newProgress;
      if(state.progress + addPercentageRound < 100){
        newProgress = addPercentageRound + state.progress;
      }else{
        newProgress = state.progress;
      }
      return {
        ...state,
        progress: newProgress,
      }
    case WINDOWUPLOADCONSOLE_RESET:
      return { state: 'close', content: 'initial', progress: 0, fileSize: '', link: ''};
    default:
      return state;
  }
}
