import React from 'react';
import styled from 'styled-components';

import AddButton from './AddButton';
import EditButton from './EditButton';
import MoreButton from './MoreButton';

const PopoutButtonGroup = ({ added, edited, deleted }) => (
  <StyledContainer>
    <AddButton clicked={added} />
    <EditButton clicked={edited} />
    <MoreButton clicked={deleted} />
  </StyledContainer>
);

const StyledContainer = styled.div`
  position: absolute;
  display: none;
  align-items: center;
  justify-content: flex-start;
  background-color: #36393f;
  box-shadow: rgba(4, 4, 5, 0.15) 0px 0px 0px 1px;
  border-radius: 4px;
  top: -10px;
  right: 10px;
  cursor: pointer;
`;

export default PopoutButtonGroup;