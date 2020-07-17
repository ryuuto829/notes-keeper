import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ children, clicked, icon }) => {
  const hasIcon = icon !== undefined;
  const hasText = children !== undefined;

  return (
    <RealButton onClick={clicked}>
      <Inner>
        {hasIcon && icon}
        {hasText && <Label hasIcon={hasIcon}>{children}</Label>}
      </Inner>
    </RealButton>
  );
};

const RealButton = styled.button`
  width: 100%;
  color: #fff;
  background-color: #7289da;
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
  transition: background-color .2s ease;

  &:hover {
    cursor: pointer;
    background-color: #677bc4;
  }

  &:active {
    background-color: #5b6eae;
  }
`;

const Label = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${props => props.hasIcon && "padding-left: 4px;"};
`;

const Inner = styled.span`
  display: flex;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  ${props => props.hasIcon && props.hasText && "padding-left: 4px;"};
  ${props => props.hasIcon && !props.hasText && "padding: 0 4px;"};
`;

Button.propTypes = {
  children: PropTypes.node
};

export default Button;
