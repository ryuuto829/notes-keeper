import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  authSignInRequest,
  authSignUpRequest
} from '../store/actions';
import { signInWithGoogle, currentUser } from '../server/firebase';

import Input from '../components/Input';
import Button from '../components/Button';
import TextButton from '../components/TextButton';
import Branding from '../components/Branding';
import GoogleLogo from '../components/GoogleLogo';
import Divider from '../components/Divider';
import Spinner from '../components/Spinner';
import { moveFromTop } from '../shared/styles/animations';

/** Test mode (delete later) */
const INITIAL_STATE_TEST_MODE = {
  email: 'test@example.com',
  username: 'Test Username',
  password: '12345678'
};

const Authentication = ({ errorMessages, userData, authSignInRequest, authSignUpRequest, isLoading }) => {
  const history = useHistory();
  const isCreate = useLocation().pathname === '/register';

  const [user, setUser] = useState(INITIAL_STATE_TEST_MODE);
  const [submitted, setSubmitted] = useState(false);

  if (userData) return <Redirect to="/home" />;

  const onChangeInputHandler = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitFormHandler = e => {
    e.preventDefault();
    setSubmitted(true);

    if (isCreate) {
      authSignUpRequest(user.email, user.username, user.password);
    } else {
      authSignInRequest(user.email, user.password);
    }
  };

  const clickRedirectHandler = () => {
    /** Clear all inputs and hide validation errors */
    setSubmitted(false);
    setUser({ email: '', username: '', password: '' });

    if (isCreate) {
      history.push('/login')
    } else {
      history.push('/register')
    }
  };

  const emailInputField = (
    <InputField
      name='email'
      type='email'
      label='EMAIL'
      errorMessages={submitted && errorMessages}
      value={user.email}
      onChange={onChangeInputHandler} />
  );

  const usernameInputField = (
    <InputField
      name='username'
      type='text'
      label='USERNAME'
      errorMessages={submitted && errorMessages}
      value={user.username}
      onChange={onChangeInputHandler} />
  );

  const passwordInputField = (
    <InputField
      name='password'
      type='password'
      label='PASSWORD'
      errorMessages={submitted && errorMessages}
      value={user.password}
      onChange={onChangeInputHandler} />
  );

  if (isCreate) {
    return (
      <Background>
        <Logo />
        <AuthBox>
          <CenteringWrapper>
            <HeaderPrimary>Create an account</HeaderPrimary>
            <FormContainer onSubmit={submitFormHandler}>
              {emailInputField}
              {usernameInputField}
              {passwordInputField}
              {isLoading ? <Button icon={<Spinner />} /> : <Button>Continue</Button>}
            </FormContainer>
            <RedirectButtonWrapper>
              <TextButton
                onClick={clickRedirectHandler}>Already have an account ?</TextButton>
            </RedirectButtonWrapper>
          </CenteringWrapper>
        </AuthBox>
      </Background>
    );
  }

  return (
    <Background>
      <Logo />
      <AuthBox>
        <CenteringWrapper>
          <HeaderPrimary>Sign in</HeaderPrimary>
          <HeaderSecondary>with your Google account</HeaderSecondary>
          <GoogleSignInWrapper>
            <Button
              icon={<GoogleLogo size={16} />}
              clicked={signInWithGoogle}>Google</Button>
          </GoogleSignInWrapper>
          <Divider />
          <FormContainer onSubmit={submitFormHandler}>
            {emailInputField}
            {passwordInputField}
            {isLoading ? <Button icon={<Spinner />} /> : <Button>Login</Button>}
          </FormContainer>
          <RedirectButtonWrapper>
            <NeedAccountText>Need an account ?</NeedAccountText>
            <TextButton
              onClick={clickRedirectHandler}>Register</TextButton>
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
  background-color: ${props => props.theme.mainBackground};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

const Logo = styled(Branding)`
  position: absolute;
  top: 20px;

  @media (min-width: 480px ) {
    top: 24px;
  }

  @media (min-width: 915px ) {
    left: 20px
  }
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

  @media (max-width: 480px) {
    height: 100%;
    padding: 30px 16px;
    min-height: 520px;
    margin-top: 0;
  }
`;

const CenteringWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const FormContainer = styled.form`
  margin-top: 8px;
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
  font-size: 14px;
  line-height: 16px;
`;

const InputField = styled(Input)`
  margin-bottom: 20px;
`;

const RedirectButtonWrapper = styled.div`
  text-align: left;
  font-size: 13px;
`;

const GoogleSignInWrapper = styled.div`
  margin-top: 20px;
`;

const NeedAccountText = styled.span`
  line-height: 16px;
  text-align: left;
  color: rgb(114, 118, 125);
`;

const mapStateToProps = state => ({
  errorMessages: state.authentication.errorMessages,
  userData: state.authentication.user,
  isLoading: state.authentication.isFetching
});

const mapDispatchToProps = dispatch => ({
  authSignInRequest: (email, password) => dispatch(authSignInRequest(email, password)),
  authSignUpRequest: (email, username, password) => dispatch(authSignUpRequest(email, username, password))
});

Authentication.propTypes = {
  errorMessages: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
