import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import HeaderPrimary from './components/HeaderPrimary';
import HeaderSecondary from './components/HeaderSecondary';
import Input from './components/Input';
import Button from './components/Button';
import { formValidation } from './Validation';

/** Input fields state configuration */
const LOGIN_INPUTS_FORMAT = [
  {
    label: 'EMAIL',
    type: 'email',
    name: 'email'
  },
  {
    label: 'PASSWORD',
    type: 'password',
    name: 'password'
  }
];

const REGISTER_INPUTS_FORMAT = [
  ...LOGIN_INPUTS_FORMAT,
  {
    label: 'USERNAME',
    type: 'text',
    name: 'username'
  }
];

const Auth = () => {
  const location = useLocation();
  const inputList = location.pathname === "/login" ?
    LOGIN_INPUTS_FORMAT :
    REGISTER_INPUTS_FORMAT;

  const initialState = {};

  inputList.forEach(input => {
    initialState[input.name] = {
      inputText: '',
      isValid: true,
      invalidMessage: null
    }
  });

  const [inputs, setInputs] = useState(initialState);

  const submitHandler = e => {
    e.preventDefault();
    const errors = {};

    inputList.forEach(input => {
      const error = formValidation(inputs[input.name].inputText, input.type);
      if (error) {
        errors[input.name] = error;
      }
    });

    const updatedState = {};

    inputList.forEach(input => {
      updatedState[input.name] = {
        ...inputs[input.name],
        isValid: errors[input.name] === undefined,
        invalidMessage: errors[input.name]
      }
    });

    setInputs(updatedState);

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      console.log('Form submit');
      // send request to the backend
      // show loading icon
    }
  };

  const inputTextChangeHandler = (name, text) => {
    setInputs({
      ...inputs,
      [name]: {
        ...inputs[name],
        inputText: text
      }
    });
  };

  const inputFields = inputList.map(input => (
    <Input
      key={input.name}
      name={input.name}
      label={input.label}
      inputType={input.type}
      invalidMessage={inputs[input.name].invalidMessage}
      isValid={inputs[input.name].isValid}
      inputValue={inputs[input.name].inputText}
      changedInputValue={inputTextChangeHandler} />
  ));

  return (
    <Wrapper>
      <Switch>
        <Route exact path="/login">
          <CSSTransition timeout={200}>
            <AuthBox>
              <CenteringWrapper>
                <HeaderPrimary>
                  <span role="img" aria-label="rocket">🚀</span> Welcome Back!
              </HeaderPrimary>
                <HeaderSecondary>We're so excited to see you again!</HeaderSecondary>
                <FormContainer
                  onSubmit={submitHandler}>
                  {inputFields}
                  <Button>Login</Button>
                </FormContainer>
                <RedirectButtonWrapper>
                  <NeedAccountText>Need an account ?</NeedAccountText>
                  <Link to="/register">
                    <TextButton>Register</TextButton>
                  </Link>
                </RedirectButtonWrapper>
              </CenteringWrapper>
            </AuthBox>
          </CSSTransition>
        </Route>
        <Route exact path="/register">
          <AuthBox>
            <CenteringWrapper>
              <HeaderPrimary>Create an account</HeaderPrimary>
              <FormContainer
                onSubmit={submitHandler}>
                {inputFields}
                <Button>Continue</Button>
              </FormContainer>
              <RedirectButtonWrapper>
                <Link to="/login">
                  <TextButton>Already have an account ?</TextButton>
                </Link>
              </RedirectButtonWrapper>
            </CenteringWrapper>
          </AuthBox>
        </Route>
      </Switch>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

const AuthBox = styled.div`
  background-color: #36393f;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: moveFromTop .3s;

  @media (max-width: 480px) {
    height: 100%;
    padding: 30px 16px;
    min-height: 580px;
  }

  @keyframes moveFromTop {
    0% {
      transform: translateY(-100px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CenteringWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const FormContainer = styled.form`
  margin-top: 20px;
`;

const RedirectButtonWrapper = styled.div`
  margin-top: 4px;
  text-align: left;
  font-size: 13px;
`;

const NeedAccountText = styled.span`
  line-height: 16px;
  text-align: left;
  color: rgb(114, 118, 125);
`;

const TextButton = styled.button`
  display: inline-block;
  margin-left: 4px;
  color: #7289da;
  font-size: inherit;
  padding: 0;
  width: auto;
  height: auto;
  outline: 0;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default Auth;