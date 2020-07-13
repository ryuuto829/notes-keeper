import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Authentication from './scenes/Authentication';

/** Delete later route `/test` */
import TestingPlayground from './_testing';

const Routes = () => (
  <Switch>
    <Route exact path="/test" component={TestingPlayground} />
    <Route exact path="/" >
      <Redirect to="/login" />
    </Route>
    <Route exact path="/login" component={Authentication} />
    <Route exact path="/register" component={Authentication} />
  </Switch >
);

export default Routes;
