import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => (
  <AuthPageWrapper>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
    </Switch>
  </AuthPageWrapper>
);

const AuthPageWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #202225;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Auth;
