import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import test from './test';
import loginUserState from './loginUserStateReducer';

export default combineReducers({
  test: test,
  loginUserState: loginUserState,
  form: reduxForm
});
