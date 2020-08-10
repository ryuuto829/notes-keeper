// @flow
import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInWithGoogle } from "../server/firebase"; // ToDo: move to redux
import {
  loginRequest,
  selectLoggedIn,
  selectErrorMessage,
  selectLoading
} from "../store/modules/login";
import validateForm from "../utils/validation";
import { type InputText } from "../types";

import Input from "../components/Input";
import Button from "../components/Button";
import TextButton from "../components/TextButton";
import Branding from "../components/Branding";
import GoogleLogo from "../shared/icons/GoogleLogo";
import Divider from "../components/Divider";
import Spinner from "../components/Spinner";
import Notice from "../components/Notice";
import Flex from "../components/Flex";
import {
  growFromCenter,
  moveFromTop,
  animateGradientBackground
} from "../shared/styles/animations";

// const INITIAL_LOGIN_STATE_TEST_MODE = {
//   email: "test@example.com",
//   password: "test123example"
// };

// Different shapes of input state for Login and Register forms
// is necessary for shaping payload to validate
const initializeState = (isCreate: boolean): InputText => {
  const state = { email: "", password: "" };
  if (isCreate) return { ...state, username: "" };
  return state;
};

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isCreate = useLocation().pathname === "/register";
  const isSignSuccess = useSelector(selectLoggedIn);
  const isSubmitted = useSelector(selectLoading);
  const errorNotice = useSelector(selectErrorMessage);

  const [inputs, setInputs] = useState(() => initializeState(isCreate));
  const [errorMessages, setErrorMessages] = useState(null);
  const [showNotice, setShowNotice] = useState(false);

  if (isSignSuccess) return <Redirect to="/home" />;

  const onChangeInputHandler = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submitFormHandler = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    setShowNotice(true);

    const errors = validateForm(inputs);

    if (errors) return setErrorMessages(errors);

    setErrorMessages(null);
    if (isCreate) {
      dispatch(loginRequest(inputs));
    } else {
      dispatch(loginRequest(inputs));
    }
  };

  const clickRedirectHandler = () => {
    setErrorMessages(null);
    setShowNotice(false);
    setInputs(initializeState(!isCreate));

    history.push(isCreate ? "/login" : "/register");
  };

  const emailInputField = (
    <InputField
      name="email"
      type="email"
      label="EMAIL"
      errorMessages={errorMessages && errorMessages.email}
      value={inputs.email}
      onChange={onChangeInputHandler}
    />
  );

  const usernameInputField = (
    <InputField
      name="username"
      type="text"
      label="USERNAME"
      errorMessages={errorMessages && errorMessages.username}
      value={inputs.username}
      onChange={onChangeInputHandler}
    />
  );

  const passwordInputField = (
    <InputField
      name="password"
      type="password"
      label="PASSWORD"
      errorMessages={errorMessages && errorMessages.password}
      value={inputs.password}
      onChange={onChangeInputHandler}
    />
  );

  if (isCreate) {
    return (
      <Background align="center" justify="center">
        <Logo />
        <AuthBox align="center" justify="center" key="register">
          <CenteringWrapper>
            <HeaderPrimary>Create an account</HeaderPrimary>
            <FormContainer onSubmit={submitFormHandler}>
              {emailInputField}
              {usernameInputField}
              {passwordInputField}
              {errorNotice && showNotice ? (
                <NoticeAlert>{errorNotice}</NoticeAlert>
              ) : null}
              {isSubmitted ? (
                <Button icon={<Spinner />} />
              ) : (
                <Button>Continue</Button>
              )}
            </FormContainer>
            <RedirectButtonWrapper>
              <TextButton onClick={clickRedirectHandler}>
                Already have an account ?
              </TextButton>
            </RedirectButtonWrapper>
          </CenteringWrapper>
        </AuthBox>
      </Background>
    );
  }

  return (
    <Background align="center" justify="center">
      <Logo />
      <AuthBox align="center" justify="center" key="login">
        <CenteringWrapper>
          <HeaderPrimary>Sign in</HeaderPrimary>
          <HeaderSecondary>with your Google account</HeaderSecondary>
          <GoogleSignInWrapper>
            <Button icon={<GoogleLogo size={16} />} clicked={signInWithGoogle}>
              Google
            </Button>
          </GoogleSignInWrapper>
          <Divider />
          <FormContainer onSubmit={submitFormHandler}>
            {emailInputField}
            {passwordInputField}
            {errorNotice && showNotice ? (
              <NoticeAlert>{errorNotice}</NoticeAlert>
            ) : null}
            {isSubmitted ? (
              <Button icon={<Spinner />} />
            ) : (
              <Button>Login</Button>
            )}
          </FormContainer>
          <RedirectButtonWrapper>
            <NeedAccountText>Need an account ?</NeedAccountText>
            <TextButton onClick={clickRedirectHandler}>Register</TextButton>
          </RedirectButtonWrapper>
        </CenteringWrapper>
      </AuthBox>
    </Background>
  );
};

const Background = styled(Flex)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.mainBackground};
  background: linear-gradient(-45deg, #363237, #2d4262, #73605b, #d09683);
  background-size: 400% 400%;
  animation: ${animateGradientBackground} 15s ease infinite;
`;

const Logo = styled(Branding)`
  position: absolute;
  top: 20px;
  animation: ${moveFromTop} 0.3s ease-out;

  @media (min-width: 480px) {
    top: 24px;
  }

  @media (min-width: 915px) {
    left: 20px;
  }
`;

const AuthBox = styled(Flex)`
  background-color: ${props => props.theme.primary};
  padding: 32px;
  width: 100%;
  max-width: 480px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  animation: ${growFromCenter} 0.3s ease-out;

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

const NoticeAlert = styled(Notice)`
  margin-bottom: 20px;
  transition: all 2s ease-in;
`;

export default Login;
