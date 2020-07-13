import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ children, clicked }) => {
  return (
    <RealButton onClick={clicked}>
      {children}
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

Button.propTypes = {
  children: PropTypes.node
};

export default Button;
