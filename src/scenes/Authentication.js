import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  submitSignUpForm,
  submitSignInForm
} from '../store/actions';
import { signInWithGoogle } from '../server/firebase';

import Input from '../components/Input';
import Button from '../components/Button';
import Branding from '../components/Branding';
import GoogleLogo from '../components/GoogleLogo';
import Divider from '../components/Divider';
import { moveFromTop } from '../shared/styles/animations';

const Authentication = ({ submitRegisterForm, submitLoginForm }) => {
  const history = useHistory();
  const isCreate = useLocation().pathname === '/register';

  const [user, setUser] = useState({
    email: '',
    username: '',
    password: ''
  });

  const onChangeInputHandler = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitFormHandler = e => {
    e.preventDefault();

    if (isCreate) {
      submitLoginForm(user.email, user.password);
    } else {
      submitRegisterForm(user.email, user.username, user.password);
    }
  };

  const emailInputField = (
    <Input
      name='email'
      type='email'
      label='EMAIL'
      value={user.email}
      onChange={onChangeInputHandler} />
  );

  const usernameInputField = (
    <Input
      name='username'
      type='text'
      label='USERNAME'
      value={user.username}
      onChange={onChangeInputHandler} />
  );

  const passwordInputField = (
    <Input
      name='password'
      type='password'
      label='PASSWORD'
      value={user.password}
      onChange={onChangeInputHandler} />
  );

  if (isCreate) {
    return (
      <Background>
        <Branding />
        <AuthBox>
          <CenteringWrapper>
            <HeaderPrimary>Create an account</HeaderPrimary>
            <FormContainer
              onSubmit={submitFormHandler}>
              {emailInputField}
              {usernameInputField}
              {passwordInputField}
              <Button>Continue</Button>
            </FormContainer>
            <RedirectButtonWrapper>
              <TextButton
                onClick={() => history.push('/login')}>Already have an account ?</TextButton>
            </RedirectButtonWrapper>
          </CenteringWrapper>
        </AuthBox>
      </Background>
    );
  }

  return (
    <Background>
      <Branding />
      <AuthBox>
        <CenteringWrapper>
          <HeaderPrimary>Sign in</HeaderPrimary>
          <HeaderSecondary>with your Google account</HeaderSecondary>
          <RedirectButtonWrapper>
            <Button clicked={signInWithGoogle}>
              <GoogleLogo size={16} />Google</Button>
          </RedirectButtonWrapper>
          <Divider />
          <FormContainer
            onSubmit={submitFormHandler}>
            {emailInputField}
            {passwordInputField}
            <Button>Login</Button>
          </FormContainer>
          <RedirectButtonWrapper>
            <NeedAccountText>Need an account ?</NeedAccountText>
            <TextButton
              onClick={() => history.push('/register')}>Register</TextButton>
          </RedirectButtonWrapper>
        </CenteringWrapper>
      </AuthBox>
    </Background>
  );
};

const Background = styled.div`
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

const AuthBox = styled.div`
  background-color: ${props => props.theme.primary};
  padding: 32px;
  width: 100%;
  max-width: 480px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${moveFromTop} .3s;
  margin-top: 46px;

  @media (max-width: 480px) {
    height: 100%;
    padding: 30px 16px;
    min-height: 520px;
    margin-top: 0;
  }
`;

const FormContainer = styled.form`
  margin-top: 8px;
`;

const CenteringWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const HeaderPrimary = styled.h1`
  font-weight: 400;
  margin: 0;
  margin-bottom: 8px;
  color: ${props => props.theme.headerPrimary};
  font-size: 24px;
  line-height: 30px;
`;

const HeaderSecondary = styled.h2`
  font-weight: 400;
  margin: 0;
  color: ${props => props.theme.headerSecondary};
  font-size: 16px;
  line-height: 20px;
`;

const RedirectButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: left;
  font-size: 13px;
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

const NeedAccountText = styled.span`
  line-height: 16px;
  text-align: left;
  color: rgb(114, 118, 125);
`;

const mapDispatchToProps = dispatch => ({
  submitLoginForm: (email, password) => dispatch(submitSignInForm(email, password)),
  submitRegisterForm: (email, username, password) => dispatch(submitSignUpForm(email, username, password))
});

Authentication.propTypes = {
  submitLoginForm: PropTypes.func.isRequired,
  submitRegisterForm: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Authentication);
