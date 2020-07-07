import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
  AuthBox,
  CenteringWrapper,
  HeaderPrimary,
  HeaderSecondary,
  FormContainer,
  RedirectButtonWrapper,
  NeedAccountText,
  TextButton
} from './components/AuthForm';
import Input from './components/Input';
import Button from './components/Button';
import { formValidation } from './Validation';

const INITIAL_INPUT_STATE = {
  inputText: '',
  isValid: true,
  invalidMessage: null
};

const LoginForm = ({ history }) => {
  const [emailInput, setEmailInput] = useState(INITIAL_INPUT_STATE);
  const [passwordInput, setPasswordInput] = useState(INITIAL_INPUT_STATE);

  const submitHandler = e => {
    e.preventDefault();

    const emailError = formValidation(emailInput.inputText, 'email');
    const passwordError = formValidation(passwordInput.inputText, 'password');

    setEmailInput({
      ...emailInput,
      isValid: emailError === null,
      invalidMessage: emailError
    });

    setPasswordInput({
      ...passwordInput,
      isValid: passwordError === null,
      invalidMessage: passwordError
    });

    if (!emailError && !passwordError) {
      console.log('Form submit');
      // send request to the backend
      // show loading icon
    }
  };

  const emailInputChangeHandler = text => {
    setEmailInput({
      ...emailInput,
      inputText: text
    });
  };

  const passwordInputChangeHandler = text => {
    setPasswordInput({
      ...passwordInput,
      inputText: text
    });
  };

  return (
    <AuthBox>
      <CenteringWrapper>
        <HeaderPrimary>
          <span role="img" aria-label="rocket">🚀 </span>
          Welcome Back!</HeaderPrimary>
        <HeaderSecondary>We're so excited to see you again!</HeaderSecondary>
        <FormContainer
          onSubmit={submitHandler}>
          <Input
            name='login-email'
            label='EMAIL'
            inputType='email'
            invalidMessage={emailInput.invalidMessage}
            isValid={emailInput.isValid}
            inputValue={emailInput.inputText}
            changedInputValue={emailInputChangeHandler} />
          <Input
            name='login-password'
            label='PASSWORD'
            inputType='password'
            invalidMessage={passwordInput.invalidMessage}
            isValid={passwordInput.isValid}
            inputValue={passwordInput.inputText}
            changedInputValue={passwordInputChangeHandler} />
          <Button>Login</Button>
        </FormContainer>
        <RedirectButtonWrapper>
          <NeedAccountText>Need an account ?</NeedAccountText>
          <TextButton
            onClick={() => history.push('/register')}>Register</TextButton>
        </RedirectButtonWrapper>
      </CenteringWrapper>
    </AuthBox>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(LoginForm);
