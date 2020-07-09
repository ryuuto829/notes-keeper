import { combineReducers } from 'redux';
import list from './list';
import authorization from './authorization';

const rootReducer = combineReducers({
  list,
  authorization
});

export default rootReducer;