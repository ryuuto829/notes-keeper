// @flow
import { keyframes } from "styled-components";

export const moveFromTop = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const growFromCenter = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const animateGradientBackground = keyframes`
  0% {
    background-position: 0% 50%;
    }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1; 
  }
`;

export const loadingBar = keyframes`
  from {
    margin-left: -100%; z-index:100;
  }
  to {
    margin-left: 100%; 
  }
`;

export const zoomOut = keyframes`
  from {
    transform: scale(1.1);
    opacity: 0.7;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const zoomIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0.7;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;
