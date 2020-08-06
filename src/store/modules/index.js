// flow
import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import document from './document';
import collection from './collection';

const rootReducer = combineReducers({
  auth,
  user,
  document,
  collection,
});

export default rootReducer;