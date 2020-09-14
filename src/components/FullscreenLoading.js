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
        <Loader width="200" height="200" viewBox="0 0 100 100">
          <StrokeStill
            points="0,0 100,0 100,100"
            strokeWidth="10"
            fill="none"
          ></StrokeStill>
          <StrokeStill
            points="0,0 0,100 100,100"
            strokeWidth="10"
            fill="none"
          ></StrokeStill>
          <StrokeAnimation
            points="0,0 100,0 100,100"
            strokeWidth="10"
            fill="none"
          ></StrokeAnimation>
          <StrokeAnimation
            points="0,0 0,100 100,100"
            strokeWidth="10"
            fill="none"
          ></StrokeAnimation>
        </Loader>
      </Label>
    </Background>
  </>
);

const Label = styled(Flex)`
  width: 100%;
  height: 100%;
  color: #dcddde;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

// Thanks to the author of this
// codepen https://codepen.io/GeoxCodes/pen/PBoQZa
const Loader = styled.svg`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg) scale(1);

  @keyframes stroke-spacing {
    0% {
      stroke-dasharray: 0 200;
    }
    45% {
      stroke-dashoffset: 0;
      stroke-dasharray: 200 200;
    }
    90% {
      stroke-dashoffset: -200;
      stroke-dasharray: 200 200;
    }
    100% {
      stroke-dashoffset: -200;
      stroke-dasharray: 200 200;
    }
  }

  @keyframes stroke-color {
    0% {
      stroke: #3498db;
    }
    100% {
      stroke: #78325a;
    }
  }
`;

const StrokeAnimation = styled.polyline`
  animation: stroke-spacing 1.2s ease-in, stroke-color 1.2s linear;
  animation-iteration-count: infinite;
  animation-delay: 0;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
  transform-origin: center center;
`;

const StrokeStill = styled.polyline`
  stroke: #232323;
`;

export default FullscreenLoading;
