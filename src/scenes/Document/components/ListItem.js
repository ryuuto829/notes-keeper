import React from 'react';
import styled from 'styled-components';
import Popout from './Popout';

const StyledItem = styled.li`
 position: relative;
`;

const StyledBullet = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  top: 15px;
  left: 0;

  &:hover {
    cursor: pointer;
    background-color: red;
  }
`;

const StyledContainer = styled.div`

  &:hover {
    background-color: rgba(4, 4, 5, 0.07);
  }
`;

const StyledContent = styled.div`
  padding: 10px;
  padding-left: 20px;
`;

const ListItem = ({ children, content }) => {
  return (
    <StyledItem>
      <StyledContainer>
        <StyledBullet />
        <StyledContent>{content}</StyledContent>
        <Popout />
      </StyledContainer>
      {children}
    </StyledItem>
  );
};

export default ListItem;