import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListItemContainer = ({ hidden, children }) => {
  return (
    <StyledContainer hidden={hidden}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.ul`
  display: ${({ hidden }) => hidden ? 'none' : 'block'};
  padding: ${({ children }) => children !== null ? '5px 0' : '0'};
  margin: 0;
  margin-left: 12px;
  padding-left:  12px;
  position: relative;
  list-style: none;
  font-size: 14px;

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    border-left: 1px solid #858585;
  }
`;

export const StyledListContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 0.9rem;
  background-color: #36393f;
  color: #dcddde;
`;

export const StyledListItemContainer = styled.li`
  padding: 3px 0;
`;

ListItemContainer.porpTypes = {
  hidden: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
};

export default ListItemContainer;
