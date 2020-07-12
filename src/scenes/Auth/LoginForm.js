import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitSignInForm } from '../../store/actions';

import {
  AuthBox,
  FormContainer,
  CenteringWrapper,
  HeaderPrimary,
  HeaderSecondary,
  RedirectButtonWrapper,
  NeedAccountText,
  TextButton
} from './components/AuthForm';
import Input from './Input';
import Button from './components/Button';

const LoginForm = ({ submitLoginForm }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChangeInputHandler = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitFormHandler = e => {
    e.preventDefault();
    submitLoginForm(user.email, user.password);
  };

  return (
    <AuthBox>
      <CenteringWrapper>
        <HeaderPrimary><span role="img" aria-label="rocket">🚀</span> Sign in</HeaderPrimary>
        <HeaderSecondary>with your Google account</HeaderSecondary>
        <FormContainer
          onSubmit={submitFormHandler}>
          <Input
            name='email'
            type='email'
            label='EMAIL'
            value={user.email}
            onChange={onChangeInputHandler} />
          <Input
            name='password'
            type='password'
            label='PASSWORD'
            value={user.password}
            onChange={onChangeInputHandler} />
          <Button>Login</Button>
        </FormContainer>
        <RedirectButtonWrapper>
          <NeedAccountText>Need an account ?</NeedAccountText>
          <TextButton
            onClick={() => history.push('/register')}>Register
            </TextButton>
        </RedirectButtonWrapper>
      </CenteringWrapper>
    </AuthBox>
  );
};

const mapDispatchToProps = dispatch => ({
  submitLoginForm: (email, password) => dispatch(submitSignInForm(email, password))
});

LoginForm.propTypes = {
  submitLoginForm: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(LoginForm);
