// @flow
import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginRequest,
  registerRequest,
  selectLoggedIn,
  selectErrorMessage,
  selectLoading
} from "../../store/modules/login";
import validateForm from "../../utils/validation";
import { type InputText } from "../../types";

import Scrollable from "../../components/Scrollable";
import Services from "./Services";
import Notices from "./Notices";
import PageTitle from "../../components/PageTitle";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TextButton from "../../components/TextButton";
import Branding from "../../components/Branding";
import Spinner from "../../components/Spinner";
import Flex from "../../components/Flex";
import Background from "../../components/Background";
import {
  growFromCenter,
  moveFromTop,
  animateGradientBackground
} from "../../shared/styles/animations";

// Different shapes of input state is necessary
// for shaping payload to validate and dispatch
const initializeState = (isCreate: boolean): InputText => {
  const state = { email: "", password: "" };

  if (process.env.NODE_ENV === "development") {
    state.email = JSON.parse(process.env.REACT_APP_TEST_EMAIL_INPUT_TEXT || "");
    state.password = JSON.parse(
      process.env.REACT_APP_TEST_PASSWORD_INPUT_TEXT || ""
    );
  }

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

  const hasAuthError = (errorNotice && showNotice) || null;

  if (isSignSuccess) return <Redirect to="/home" />;

  const onChangeInputHandler = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputs({ ...inputs, [name]: value });
  };

  const submitFormHandler = (e: SyntheticEvent<>) => {
    e.preventDefault();

    const errors = validateForm(inputs);
    if (errors) return setErrorMessages(errors);

    setShowNotice(true);
    setErrorMessages(null);

    if (isCreate) {
      dispatch(registerRequest(inputs));
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
    <Input
      name="email"
      type="email"
      label="EMAIL"
      errorMessages={errorMessages && errorMessages.email}
      value={inputs.email}
      onChangeHandler={onChangeInputHandler}
      autoComplete="off"
    />
  );

  const usernameInputField = (
    <Input
      name="username"
      type="text"
      label="USERNAME"
      errorMessages={errorMessages && errorMessages.username}
      value={inputs.username}
      onChangeHandler={onChangeInputHandler}
      autoComplete="off"
    />
  );

  const passwordInputField = (
    <Input
      name="password"
      type="password"
      label="PASSWORD"
      errorMessages={errorMessages && errorMessages.password}
      value={inputs.password}
      onChangeHandler={onChangeInputHandler}
    />
  );

  if (isCreate) {
    return (
      <AnimatedBackground>
        <Scrollable>
          <Wrapper align="center" justify="center">
            <PageTitle title="Create an account" />
            <Logo />
            <AuthBox align="center" justify="center" key="register">
              <CenteringWrapper>
                <HeaderPrimary>Create an account</HeaderPrimary>
                <FormContainer onSubmit={submitFormHandler}>
                  {emailInputField}
                  {usernameInputField}
                  {passwordInputField}
                  {hasAuthError && <Notices notice={errorNotice} />}
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
          </Wrapper>
        </Scrollable>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground>
      <Scrollable>
        <Wrapper align="center" justify="center">
          <PageTitle title="Login" />
          <Logo />
          <AuthBox align="center" justify="center" key="login">
            <CenteringWrapper>
              <HeaderPrimary>Sign in</HeaderPrimary>
              <HeaderSecondary>with your Google account</HeaderSecondary>
              <Services />
              <FormContainer onSubmit={submitFormHandler}>
                {emailInputField}
                {passwordInputField}
                {hasAuthError && <Notices notice={errorNotice} />}
                {isSubmitted ? (
                  <Button icon={<Spinner />} disabled />
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
        </Wrapper>
      </Scrollable>
    </AnimatedBackground>
  );
};

const AnimatedBackground = styled(Background)`
  /* Other gradient variant */
  /* background: linear-gradient(-45deg, #363237, #2d4262, #73605b, #d09683); */
  background: linear-gradient(-45deg, #28313b, #7e7e7e, #485461);
  background-size: 400% 400%;
  animation: ${animateGradientBackground} 15s ease infinite;

  @media (max-width: 480px) {
    background: ${props => props.theme.primary};
    animation: none;
  }
`;

const Wrapper = styled(Flex)`
  height: 100%;
  min-height: 550px;
`;

const Logo = styled(Branding)`
  position: fixed;
  top: 24px;
  opacity: 0;

  @media (min-width: 915px) {
    animation: ${moveFromTop} 0.3s ease-out;
    opacity: 1;
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
    margin: 0;
    animation: none;
  }
`;

const CenteringWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const FormContainer = styled.form`
  margin-top: 8px;

  & input {
    margin-bottom: 20px;
  }
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
  margin-bottom: 20px;
  color: ${props => props.theme.headerSecondary};
  font-size: 14px;
  line-height: 16px;
`;

const RedirectButtonWrapper = styled.div`
  text-align: left;
  font-size: 13px;
`;

const NeedAccountText = styled.span`
  line-height: 16px;
  text-align: left;
  color: rgb(114, 118, 125);
`;

export default Login;
