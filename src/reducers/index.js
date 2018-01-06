import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import test from './test';
import loginUserState from './loginUserStateReducer';
import apiUrl from './apiUrl';
import clients from './clients';
import projects from './projects';

export default combineReducers({
  test: test,
  loginUserState: loginUserState,
  apiUrl: apiUrl,
  clients: clients,
  projects: projects,
  form: reduxForm
});
