// @flow
import * as React from "react";
import styled from "styled-components";

type Props = {
  // Don't pass the icon, only plain text
  children?: React.Node,
  clicked?: () => void,
  icon?: React.Node,
  variant?: "primary" | "secondary",
  className?: string,
  ...
};

const Button = ({
  children,
  clicked,
  icon,
  variant = "primary",
  className,
  ...rest
}: Props) => {
  const hasIcon = icon !== undefined;
  const hasText = children !== undefined;

  return (
    <RealButton
      {...rest}
      className={className}
      variant={variant}
      onClick={clicked}
    >
      <Inner>
        {hasIcon && icon}
        {hasText && <Label hasIcon={hasIcon}>{children}</Label>}
      </Inner>
    </RealButton>
  );
};

const RealButton = styled.button`
  width: 100%;
  color: ${props => (props.variant === "primary" ? "#fff" : "#36393f")};
  background-color: ${props =>
    props.variant === "primary" ? "#7289da" : "fff"};
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  height: 44px;
  min-width: 130px;
  min-height: 44px;
  border-radius: 3px;
  padding: 2px 16px;
  outline: 0;
  border: none;
  transition: background-color 0.2s ease;

  &:hover {
    cursor: pointer;
    background-color: #677bc4;
    background-color: ${props =>
      props.variant === "primary" ? "#677bc4" : "rgb(255 255 255 / 75%)"};
  }

  &:active {
    background-color: ${props =>
      props.variant === "primary" ? "#5b6eae" : "rgb(255 255 255 / 50%)"};
  }
`;

const Label = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${props => props.hasIcon && "padding-left: 4px;"};

  @media (max-width: 300px) {
    display: none;
  }
`;

const Inner = styled.span`
  display: flex;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  ${props => props.hasIcon && props.hasText && "padding-left: 4px;"};
  ${props => props.hasIcon && !props.hasText && "padding: 0 4px;"};
`;

export default Button;
