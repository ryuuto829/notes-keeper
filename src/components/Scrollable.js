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

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 6px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #202225;

      &:hover {
        background-color: #4e4e4e;
      }
    }

    &::-webkit-scrollbar-track {
      &:hover {
        background-color: #3a3a3a;
      }
    }
  }
`;

export default Scrollable;
