// @flow
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  selectError,
  selectSuccess,
  clearSnackbarMessage
} from "../../store/modules/settings";
import { logoutRequest } from "../../store/modules/login";

import Background from "../../components/Background";
import Scrollable from "../../components/Scrollable";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import Snackbar from "../../components/Snackbar";
import ExitButton from "./components/ExitButton";
import Divider from "./components/Divider";
import UserInfo from "./UserInfo";
import { zoomOut } from "../../shared/styles/animations";

const Settings = () => {
  const dispatch = useDispatch();
  const [closed, setClosed] = useState(false);
  const snackbarError = useSelector(selectError);
  const snackbarSuccess = useSelector(selectSuccess);

  useEffect(() => {
    const onPressHandler = (e: KeyboardEvent) => {
      // On 'Esc'
      if (e.keyCode === 27) {
        setClosed(true);
      }
    };

    // $FlowFixMe listeners add native event, but not synthetic
    document.addEventListener("keydown", onPressHandler, false);

    return () => {
      document.removeEventListener("keydown", onPressHandler, false);
    };
  }, []);

  if (closed) return <Redirect to="/" />;

  return (
    <Background bgColor="#36393f">
      <Scrollable>
        <PageTitle title="Settings" />
        {snackbarError ? (
          <Snackbar
            autoCloseIn={6000}
            show={snackbarError}
            content={snackbarError}
            closed={() => dispatch(clearSnackbarMessage())}
            danger
          />
        ) : null}
        {snackbarSuccess ? (
          <Snackbar
            autoCloseIn={6000}
            show={snackbarSuccess}
            content={snackbarSuccess}
            closed={() => dispatch(clearSnackbarMessage())}
            success
          />
        ) : null}
        <ExitButton clicked={() => setClosed(true)} />
        <Wrapper>
          <Header>MY ACCOUNT</Header>
          <UserInfo />
          <Divider />
          <Header>LOGOUT</Header>
          <Button
            color="#f04747"
            hoverColor="rgba(240, 71, 71, 0.1)"
            hoverTextColor="#dcddde"
            outlined
            large
            clicked={() => dispatch(logoutRequest())}
          >
            Log Out
          </Button>
        </Wrapper>
      </Scrollable>
    </Background>
  );
};

const Wrapper = styled.div`
  max-width: 740px;
  padding: 60px 40px 80px;
  margin: 0 auto;
  animation: ${zoomOut} 250ms ease-in-out;

  @media (max-width: 800px) {
    padding: 60px 55px 80px;
  }

  @media (max-width: 400px) {
    padding: 60px 15px 80px;
  }
`;

const Header = styled.h2`
  color: white;
  margin: 0;
  margin-bottom: 20px;
  font-size: 16px;
`;

export default Settings;
