import { WINDOWPROJECTTAB } from './types';

//Muestra la lista de proyectos dentro de la tab de proyectos
export const windowProjectTabViewList = () => (dispatch) => {
    dispatch({ type: WINDOWPROJECTTAB, payload: 'list' });
};

//Muestra el detalle de un proyecto dentro de la tab de proyectos
export const windowProjectTabViewDetail = () => (dispatch) => {
    dispatch({ type: WINDOWPROJECTTAB, payload: 'detail' });
};

//Muestra el editor de proyecto
export const windowProjectTabViewEdit = () => (dispatch) => {
    dispatch({ type: WINDOWPROJECTTAB, payload: 'edit' });
};
