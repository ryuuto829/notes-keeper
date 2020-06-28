import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PopoutButton = ({ children, name, clicked }) => (
  <StyledButton
   onClick={clicked}>
    <StyledIcon height="24" viewBox="0 0 24 24" width="24">
      {children}
    </StyledIcon>
  </StyledButton>
);

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 24px;
  height: 24px;
  box-sizing: content-box;

  &:hover {
    background-color: rgba(79, 84, 92, 0.16);
  }
`;

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  display: block;
  object-fit: contain;
`;

export default PopoutButton;

PopoutButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};