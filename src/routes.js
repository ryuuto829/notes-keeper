import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Authenticated from './components/Authenticated';
import Login from './scenes/Login';
import Home from './scenes/Home';
import Collection from './scenes/Collection';

const Routes = () => (
  <Switch>
    <Route exact path="/" >
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Login} />
    <Authenticated>
      <Route exact path="/home" component={Home} />
      <Route exact path="/collection" component={Collection} />
    </Authenticated>
  </Switch >
);

export default Routes;
