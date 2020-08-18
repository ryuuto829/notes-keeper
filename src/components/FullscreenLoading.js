// @flow
import * as React from "react";
import styled from "styled-components";

import LoadingBar from "./LoadingBar";
import Background from "./Background";
import Flex from "./Flex";
import { fadeIn } from "../shared/styles/animations";

const FullscreenLoading = () => (
  <>
    <LoadingBar />
    <Background>
      <Label align="center" justify="center">
        Loading ...
      </Label>
    </Background>
  </>
);

const Label = styled(Flex)`
  width: 100%;
  height: 100%;
  color: white;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export default FullscreenLoading;
