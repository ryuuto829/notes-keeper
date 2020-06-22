import React from 'react';
import styled from 'styled-components';

const StyledListContainer = styled.ul`
  padding: 0;
  margin: 0;
  margin-left: 10px;
  padding-left: 10px;
  position: relative;
  list-style: none;
  font-size: 14px;

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    left: -32px;
    border-left: 2px solid #ccc;
  }
`;

const ListContainer = ({ children }) => {
  return (
    <StyledListContainer>
      {children}
    </StyledListContainer>
  );
};

export default ListContainer;