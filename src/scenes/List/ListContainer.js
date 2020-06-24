import React from 'react';
import PropTypes from 'prop-types';
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

ListContainer.porpTypes = {
  hidden: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
};

export default ListContainer;
