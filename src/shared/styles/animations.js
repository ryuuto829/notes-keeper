import { keyframes } from "styled-components";

export const moveFromTop = keyframes`
  0% {
    transform: translateY(-100px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
