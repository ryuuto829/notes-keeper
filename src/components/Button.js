// @flow
import * as React from "react";
import styled from "styled-components";

import Flex from "./Flex";

type Props = {
  // Don't pass the icon, only plain text
  children?: React.Node,
  clicked?: () => void,
  icon?: React.Node,
  variant?: "primary" | "secondary",
  className?: string,
  color?: string,
  bgColor?: string,
  hoverColor?: string,
  ...
};

const Button = ({
  children,
  clicked,
  icon,
  variant = "primary",
  fullWidth,
  large,
  className,
  color,
  bgColor,
  hoverColor,
  outlined,
  ...rest
}: Props) => {
  const hasIcon = icon !== undefined;
  const hasText = children !== undefined;

  return (
    <RealButton
      {...rest}
      className={className}
      outlined={outlined}
      color={color}
      bgColor={bgColor}
      hoverColor={hoverColor}
      large={large}
      fullWidth={fullWidth}
      variant={variant}
      onClick={clicked}
    >
      <Inner large={large} align="center" justify="center">
        {hasIcon && icon}
        {hasText && <Label hasIcon={hasIcon}>{children}</Label>}
      </Inner>
    </RealButton>
  );
};

const RealButton = styled.button`
  line-height: 24px;
  border-radius: 3px;
  padding: 2px 16px;
  outline: 0;
  border: none;
  display: ${props => (props.fullWidth ? "block" : "inline-block")};
  width: ${props => (props.fullWidth ? "100%" : "auto")};
  color: ${props => (props.variant === "primary" ? "#fff" : "#36393f")};
  background-color: ${props =>
    props.variant === "primary" ? "#7289da" : "fff"};
  font-size: ${props => (props.large ? "16px" : "14px")};
  height: ${props => (props.large ? "44px" : "32px")};
  ${props => (props.large ? "min-width: 130px" : null)};
  ${props => (props.large ? "min-height: 44px" : null)};
  ${props => (props.bgColor ? `background-color: ${props.bgColor}` : null)};
  ${props => (props.color ? `color: ${props.color}` : null)};
  ${props => (props.outlined ? "background-color: transparent" : null)};
  ${props => (props.outlined ? "border: 1px solid #f04747;" : null)};

  transition: background-color 0.2s ease;

  &:hover {
    cursor: pointer;
    background-color: #677bc4;
    background-color: ${props =>
      props.variant === "primary" ? "#677bc4" : "rgb(255 255 255 / 75%)"};
    ${props => (props.outlined ? "background-color: transparent" : null)};
    ${props => (props.bgColor ? `background-color: ${props.bgColor}` : null)};
    ${props =>
      props.hoverColor ? `background-color: ${props.hoverColor}` : null};
  }

  &:active {
    background-color: ${props =>
      props.variant === "primary" ? "#5b6eae" : "rgb(255 255 255 / 50%)"};
    ${props => (props.outlined ? "background-color: transparent" : null)};
    ${props => (props.bgColor ? `background-color: ${props.bgColor}` : null)};
    ${props =>
      props.hoverColor ? `background-color: ${props.hoverColor}` : null};
  }
`;

const Label = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${props => props.hasIcon && "padding-left: 4px;"};
`;

const Inner = styled(Flex)`
  ${props => (props.large ? "padding: 0 8px" : null)};
  ${props => props.hasIcon && props.hasText && "padding-left: 4px;"};
  ${props => props.hasIcon && !props.hasText && "padding: 0 4px;"};
`;

export default Button;
