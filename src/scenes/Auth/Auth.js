import React, { useState } from 'react';
import styled from 'styled-components';

import HeaderPrimary from './components/HeaderPrimary';
import HeaderSecondary from './components/HeaderSecondary';
import Input from './components/Input';
import Button from './components/Button';

/** Input fields state configuration */
const INPUT_FIELDS_FORMAT = [
  {
    label: 'EMAIL',
    type: 'email',
    name: 'email-login'
  },
  {
    label: 'PASSWORD',
    type: 'password',
    name: 'password-login'
  }
];

const [email, password] = INPUT_FIELDS_FORMAT.map(input => {
  return {
    [input.name]: {
      inputText: '',
      isValid: true,
      invalidMessage: null
    }
  };
});

const Auth = () => {
  const [inputs, setInputs] = useState({ ...email, ...password });

  const inputTextChangeHandler = (name, text) => {
    setInputs({
      ...inputs,
      [name]: {
        ...inputs[name],
        inputText: text
      }
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log('Form submit');
  }

  const inputFields = INPUT_FIELDS_FORMAT.map(input => (
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
      <AuthBox>
        <CenteringWrapper>
          <HeaderPrimary>Welcome Back!</HeaderPrimary>
          <HeaderSecondary>We're so excited to see you again!</HeaderSecondary>
          <FormContainer
            onSubmit={submitHandler}>
            {inputFields}
            <Button>Login</Button>
          </FormContainer>
        </CenteringWrapper>
      </AuthBox>
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

export default Auth;