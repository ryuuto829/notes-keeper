// flow
import { combineReducers } from "redux";

import settings from "./settings";
import login from "./login";
import ui from "./ui";
import document from "./document";
import collection from "./collection";
import _test_database from "./_test_database";

const rootReducer = combineReducers({
  login,
  ui,
  document,
  collection,
  settings,
  _test_database // MOVE STORE TO SERVER
});

export default rootReducer;
