import { combineReducers } from 'redux';
import authentication from './authentication';
import UI from './UI';

const rootReducer = combineReducers({
  UI,
  authentication
});

export default rootReducer;