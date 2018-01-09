import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import test from './test';
import loginUserState from './loginUserStateReducer';
import apiUrl from './apiUrl';
import clients from './clients';
import projects from './projects';
import window_ProjectTab from './window_ProjectTab';
import projectDetail from './projectDetail';
import projectUsers from './projectUsers';
import newStage from './newStage';
import deleteStageList from './deleteStageList';

export default combineReducers({
  test: test,
  loginUserState: loginUserState,
  apiUrl: apiUrl,
  clients: clients,
  projects: projects,
  form: reduxForm,
  window_ProjectTab: window_ProjectTab,
  projectDetail: projectDetail,
  projectUsers: projectUsers,
  newStage: newStage,
  deleteStageList: deleteStageList
});
