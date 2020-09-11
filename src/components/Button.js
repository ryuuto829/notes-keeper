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
  hoverTextColor?: string,
  hoverColor?: string,
  padding?: string,
  fullWidth?: boolean,
  large?: boolean,
  outlined?: boolean,
  innerRef?: React.ElementRef<any>,
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
  hoverTextColor,
  padding,
  outlined,
  innerRef,
  ...rest
}: Props) => {
  const hasIcon = icon !== undefined;
  const hasText = children !== undefined;

  return (
    <RealButton
      {...rest}
      ref={innerRef}
      className={className}
      outlined={outlined}
      color={color}
      bgColor={bgColor}
      hoverTextColor={hoverTextColor}
      hoverColor={hoverColor}
      large={large}
      fullWidth={fullWidth}
      variant={variant}
      padding={padding}
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
  outline: 0;
  border: none;
  padding: ${props => (props.padding ? props.padding : "2px 16px")};
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
    ${props =>
      props.hoverTextColor ? `color: ${props.hoverTextColor}` : null};
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

// Give ref for tooltip component
export default React.forwardRef<Props, typeof Button>((props, ref) => (
  <Button {...props} innerRef={ref} />
));
