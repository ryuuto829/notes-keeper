import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  AuthBox,
  CenteringWrapper,
  HeaderPrimary,
  HeaderSecondary,
  RedirectButtonWrapper,
  NeedAccountText,
  TextButton
} from './AuthForm';
import InputGroup from '../InputGroup';

const LOGIN_INPUTS = [
  {
    name: 'email',
    label: 'EMAIL',
    inputType: 'email'
  },
  {
    name: 'password',
    label: 'PASSWORD',
    inputType: 'password'
  },
];

const LoginForm = ({ history }) => (
  <AuthBox>
    <CenteringWrapper>
      <HeaderPrimary><span role="img" aria-label="rocket">🚀</span> Welcome Back!</HeaderPrimary>
      <HeaderSecondary>We're so excited to see you again!</HeaderSecondary>
      <InputGroup
        inputsType='login'
        inputsConfig={LOGIN_INPUTS} />
      <RedirectButtonWrapper>
        <NeedAccountText>Need an account ?</NeedAccountText>
        <TextButton
          onClick={() => history.push('/register')}>Register</TextButton>
      </RedirectButtonWrapper>
    </CenteringWrapper>
  </AuthBox>
);

LoginForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(LoginForm);
