import React from 'react';
import styled from 'styled-components';

const Scrollable = props => {
  return (
    <Wrapper  {...props} />
  );
};

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: none;
  transition: all 250ms ease-in-out;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 6px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #202225;
    }
  }
`;

export default Scrollable;
