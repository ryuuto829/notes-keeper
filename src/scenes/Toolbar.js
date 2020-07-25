import React from 'react';
import styled from 'styled-components';

const Toolbar = ({ isLocked }) => {
  return (
    <Wrapper isLocked={isLocked}>Toolbar</Wrapper>
  );
};

const Wrapper = styled.div`
  height: 45px;
  position: fixed;
  width: 100%;
  transition: all 200ms ease-in 0s;
  margin-left: ${props => props.isLocked ? '244px' : '0'};
  padding: 0 20px;
`;

export default Toolbar;
