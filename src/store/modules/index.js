// flow
import { combineReducers } from "redux";
import login from "./login";
import ui from "./ui";
import _test_database from "./_test_database";

const rootReducer = combineReducers({
  login,
  ui,
  _test_database // MOVE STORE TO SERVER
});

export default rootReducer;
