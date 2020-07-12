import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Branding from '../../components/Branding';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => (
  <AuthPageWrapper>
    <Branding />
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegisterForm} />
    </Switch>
  </AuthPageWrapper>
);

const AuthPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.mainBackground};
`;

export default Auth;
