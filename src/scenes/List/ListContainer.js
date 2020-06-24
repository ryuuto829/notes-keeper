import React from 'react';
import styled from 'styled-components';

const ListContainer = ({ hidden, children }) => {
  return (
    <StyledContainer hidden={hidden}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.ul`
  display: ${({ hidden }) => hidden ? "none" : "block"};
  background-color: #ccc;
`;

export default ListContainer;