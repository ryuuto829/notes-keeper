import { combineReducers } from 'redux';
import list from './list';
import authentication from './authentication';

const rootReducer = combineReducers({
  list,
  authentication
});

export default rootReducer;