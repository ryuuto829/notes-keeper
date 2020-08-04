// @flow
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./store/configureStore";

import Theme from "./components/Theme";
import Routes from "./routes";

const store = configureStore();
const element = document.getElementById("notes-keeper-app");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Router>
          <Routes />
        </Router>
      </Theme>
    </Provider>
  </React.StrictMode>,
  // $FlowIssue flow assumes that the call can return null, but we control it
  element
);
