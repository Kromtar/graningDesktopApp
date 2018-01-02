import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import test from './test';

export default combineReducers({
  test: test,
});
