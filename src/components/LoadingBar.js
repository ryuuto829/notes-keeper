// @flow
import * as React from "react";
import styled from "styled-components";

import { loadingBar } from "../shared/styles/animations";

const LoadingBar = () => (
  <Container>
    <Loader />
  </Container>
);

const Container = styled.div`
  position: fixed;
  top: 1;
  z-index: 9999;
  width: 100%;
  animation: ${loadingBar} 4s ease-in-out infinite;
  animation-delay: 250ms;
  margin-left: -100%;
`;

const Loader = styled.div`
  width: 100%;
  height: 2px;
  background-color: #03a9f4;
`;

export default LoadingBar;
