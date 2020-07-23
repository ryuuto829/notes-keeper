import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Authenticated from './components/Authenticated';
import Login from './scenes/Login';
import Home from './scenes/Home';

/** Delete later route `/test` */
import TestingPlayground from './_testing';

const Routes = () => (
  <Switch>
    <Route exact path="/test" component={TestingPlayground} />
    <Route exact path="/" >
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Login} />
    <Authenticated>
      <Route exact path="/home" component={Home} />
    </Authenticated>
  </Switch >
);

export default Routes;
