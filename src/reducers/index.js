import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import test from './test';
import loginUserState from './loginUserStateReducer';
import apiUrl from './apiUrl';

export default combineReducers({
  test: test,
  loginUserState: loginUserState,
  apiUrl: apiUrl,
  form: reduxForm
});
