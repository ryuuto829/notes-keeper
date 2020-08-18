// @flow
import * as React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectLoading } from "../store/modules/login";

import Flex from "./Flex";
import LoaderBar from "./LoaderBar";

type Props = {
  children: React.Node
};

const Authenticated = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);

  if (isLoading) {
    return (
      <Background align="center" justify="center">
        <LoaderBar />
      </Background>
    );
  }

  if (isAuthenticated) return children;

  return <Redirect to="/login" />;
};

const Background = styled(Flex)`
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

export default Authenticated;
