import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import {
  HeaderPrimary,
  FormContainer,
  RedirectButtonWrapper,
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

const RegisterForm = ({ history }) => {
  const [emailInput, setEmailInput] = useState(INITIAL_INPUT_STATE);
  const [passwordInput, setPasswordInput] = useState(INITIAL_INPUT_STATE);
  const [userNameInput, setUserNameInput] = useState(INITIAL_INPUT_STATE);

  const submitHandler = e => {
    e.preventDefault();

    const emailError = formValidation(emailInput.inputText, 'email');
    const passwordError = formValidation(passwordInput.inputText, 'password');
    const userNameError = formValidation(userNameInput.inputText, 'text') || null;

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

    setUserNameInput({
      ...userNameInput,
      isValid: userNameError === null,
      invalidMessage: userNameError
    });

    if (!emailError && !passwordError && !userNameError) {
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

  const userNameInputChangeHandler = text => {
    setUserNameInput({
      ...userNameInput,
      inputText: text
    });
  };

  return (
    <React.Fragment>
      <HeaderPrimary>Create an account</HeaderPrimary>
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
          name='username-password'
          label='USERNAME'
          inputType='text'
          invalidMessage={userNameInput.invalidMessage}
          isValid={userNameInput.isValid}
          inputValue={userNameInput.inputText}
          changedInputValue={userNameInputChangeHandler} />
        <Input
          name='login-password'
          label='PASSWORD'
          inputType='password'
          invalidMessage={passwordInput.invalidMessage}
          isValid={passwordInput.isValid}
          inputValue={passwordInput.inputText}
          changedInputValue={passwordInputChangeHandler} />
        <Button>Continue</Button>
      </FormContainer>
      <RedirectButtonWrapper>
        <TextButton
          onClick={() => history.push('/login')}>Already have an account ?</TextButton>
      </RedirectButtonWrapper>
    </React.Fragment>
  );
};

export default withRouter(RegisterForm);