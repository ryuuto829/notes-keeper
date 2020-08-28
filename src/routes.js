// @flow
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Authenticated from "./components/Authenticated";
import Layout from "./components/Layout";
import Login from "./scenes/Login";
import Document from "./scenes/Document";
import Settings from "./scenes/Settings";

const Empty = () => <div>Empty</div>; // DELETE LATER

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Login} />
    <Authenticated>
      <Route exact path={["/home", "/page/:id"]}>
        <Layout>
          <Route exact path="/home" component={Empty} />
          <Route exact path="/page/:id" component={Document} />
        </Layout>
      </Route>
      <Route exact path="/settings" component={Settings} />
    </Authenticated>
  </Switch>
);

export default Routes;
