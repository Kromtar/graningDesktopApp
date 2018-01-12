import {
  WINDOWPROJECTTAB,
  CLEAR_NEW_STAGE,
  CLEAR_STAEGEID_FOR_DELETE,
  CLEAR_NEW_REV,
  CLEAR_REVID_FOR_DELETE,
  COPY_PROJECTDETAILSTATIC_TO_PROJECTDETAIL,
  CLEAR_EDIT_REV
} from './types';

//Muestra la lista de proyectos dentro de la tab de proyectos
export const windowProjectTabViewList = () => (dispatch) => {
    dispatch({ type: WINDOWPROJECTTAB, payload: 'list' });
};

//Muestra el detalle de un proyecto dentro de la tab de proyectos
export const windowProjectTabViewDetail = () => (dispatch) => {
    dispatch({ type: WINDOWPROJECTTAB, payload: 'detail' });
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
