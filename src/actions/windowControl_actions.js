import {
  WINDOWPROJECTTAB,
  CLEAR_NEW_STAGE,
  CLEAR_STAEGEID_FOR_DELETE,
  CLEAR_NEW_REV,
  CLEAR_REVID_FOR_DELETE,
  COPY_PROJECTDETAILSTATIC_TO_PROJECTDETAIL,
  CLEAR_EDIT_REV,
  WINDOWCLIENTTAB
} from './types';

//Muestra la lista de proyectos dentro de la tab de proyectos
export const windowProjectTabViewList = () => (dispatch) => {
    dispatch({ type: WINDOWPROJECTTAB, payload: 'list' });
    //hacer la peti otra bez
};

//Muestra el detalle de un proyecto dentro de la tab de proyectos
export const windowProjectTabViewDetail = () => (dispatch) => {
    dispatch({ type: WINDOWPROJECTTAB, payload: 'detail' });
    //hacer la peti otra bez
};

//Muestra el editor de proyecto
export const windowProjectTabViewEdit = () => (dispatch, getState) => {
    dispatch({ type: WINDOWPROJECTTAB, payload: 'edit' });
    dispatch({ type: CLEAR_NEW_STAGE });
    dispatch({ type: CLEAR_NEW_REV });
    dispatch({ type: CLEAR_STAEGEID_FOR_DELETE });
    dispatch({ type: CLEAR_REVID_FOR_DELETE });
    dispatch({ type: CLEAR_EDIT_REV });
    dispatch({ type: COPY_PROJECTDETAILSTATIC_TO_PROJECTDETAIL, payload: getState().projectDetailStatic });
};

//Muestra la lista de Usuarios
export const windowClientTabViewList = () => (dispatch) => {
    dispatch({ type: WINDOWCLIENTTAB, payload: 'list' });
};

//Muestra el detalle de un usuario
export const windowClientTabViewDetail = () => (dispatch) => {
    dispatch({ type: WINDOWCLIENTTAB, payload: 'detail' });
};

//Muestra el editor de usuario
export const windowClientTabViewEdit = () => (dispatch, getState) => {
    dispatch({ type: WINDOWCLIENTTAB, payload: 'edit' });
};
