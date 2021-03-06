// @flow
import * as React from "react";
import styled from "styled-components";

type Props = {
  horizontal?: boolean,
  size?: "large" | "small",
  className?: string,
  ...
};

const Scrollable = ({ size = "large", className, ...rest }: Props) => (
  <Wrapper {...rest} size={size} className={className} />
);

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: ${props => (props.horizontal ? "auto" : "hidden")};
  overscroll-behavior: none;

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: ${props => (props.size === "large" ? "10px" : "5px")};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props =>
      props.size === "large" ? "rgba(0, 0, 0, 0.4)" : "transparent"};
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${props =>
      props.size === "large" ? "rgba(0, 0, 0, 0.2)" : "transparent"};
    border-radius: 6px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      ${props =>
        props.size === "large"
          ? "rgba(0, 0, 0, 0.2)"
          : "background-color: #202225"};

      &:hover {
        ${props =>
          props.size === "large"
            ? "rgba(0, 0, 0, 0.2)"
            : "background-color: #4e4e4e"};
      }
    }

    &::-webkit-scrollbar-track {
      &:hover {
        ${props =>
          props.size === "large"
            ? "rgba(0, 0, 0, 0.2)"
            : "background-color: #3a3a3a"};
      }
    }
  }

  @media (max-width: 600px) {
    &::-webkit-scrollbar {
      width: ${props => (props.size === "large" ? "8px" : "5px")};
    }
  }
`;

export default Scrollable;
