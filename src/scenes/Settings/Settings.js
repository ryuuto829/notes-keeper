// @flow
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import Background from "../../components/Background";
import Scrollable from "../../components/Scrollable";
import PageTitle from "../../components/PageTitle";

import ExitButton from "./components/ExitButton";
import UserInfo from "./UserInfo";
import { zoomOut } from "../../shared/styles/animations";

const Settings = () => {
  const [closed, setClosed] = useState(false);

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
        <ExitButton clicked={() => setClosed(true)} />
        <Wrapper>
          <Header>MY ACCOUNT</Header>
          <UserInfo />
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
