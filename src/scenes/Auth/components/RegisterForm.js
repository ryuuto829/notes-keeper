import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  AuthBox,
  CenteringWrapper,
  HeaderPrimary,
  RedirectButtonWrapper,
  TextButton
} from './AuthForm';
import InputGroup from '../InputGroup';

const RegisterForm = ({ history }) => (
  <AuthBox>
    <CenteringWrapper>
      <HeaderPrimary>Create an account</HeaderPrimary>
      <InputGroup
        inputsType='register'
        inputsConfig={['email', 'username', 'password']} />
      <RedirectButtonWrapper>
        <TextButton
          onClick={() => history.push('/login')}>Already have an account ?</TextButton>
      </RedirectButtonWrapper>
    </CenteringWrapper>
  </AuthBox>
);

RegisterForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(RegisterForm);
