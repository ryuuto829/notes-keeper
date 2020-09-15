// @flow
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Authenticated from "./components/Authenticated";
import Layout from "./components/Layout";
import Login from "./scenes/Login";
import Document from "./scenes/Document";
import Settings from "./scenes/Settings";
import Collection from "./scenes/Collection";
import Error404 from "./scenes/Error404";
import DocumentNew from "./scenes/DocumentNew"; // DELETE LATER

// const Empty = () => <div>Empty</div>; // DELETE LATER

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Login} />
    <Route exact path={["/home", "/collection", "/page/:id", "/settings"]}>
      <Authenticated>
        <Layout>
          <Route exact path="/home" component={DocumentNew} />
          <Route exact path="/collection" component={Collection} />
          <Route exact path="/page/:id" component={Document} />
        </Layout>
        <Route exact path="/settings" component={Settings} />
      </Authenticated>
    </Route>
    <Route component={Error404} />
  </Switch>
);

export default Routes;
