import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import test from './test';
import loginUserState from './loginUserStateReducer';
import apiUrl from './apiUrl';
import clients from './clients';
import projects from './projects';
import window_ProjectTab from './window_ProjectTab';
import projectDetail from './projectDetail';
import projectDetailStatic from './projectDetailStatic';
import projectUsers from './projectUsers';
import newStage from './newStage';
import deleteStageList from './deleteStageList';
import newRev from './newRev';
import deleteRevList from './deleteRevList';
import editRev from './editRev';
import window_ClientTab from './window_ClientTab';
import clientDetail from './clientDetail';
import clientDetailStatic from './clientDetailStatic';

export default combineReducers({
  test: test,
  loginUserState: loginUserState,
  apiUrl: apiUrl,
  clients: clients,
  projects: projects,
  form: reduxForm,
  window_ProjectTab: window_ProjectTab,
  projectDetail: projectDetail,
  projectDetailStatic: projectDetailStatic,
  projectUsers: projectUsers,
  newStage: newStage,
  deleteStageList: deleteStageList,
  newRev: newRev,
  deleteRevList: deleteRevList,
  editRev: editRev,
  window_ClientTab: window_ClientTab,
  clientDetail: clientDetail,
  clientDetailStatic: clientDetailStatic
});
