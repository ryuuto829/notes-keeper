import { combineReducers } from 'redux';
import authentication from './authentication';
import document from './document';

const rootReducer = combineReducers({
  authentication,
  document,
});

export default rootReducer;