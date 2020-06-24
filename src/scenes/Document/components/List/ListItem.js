import React, { useState } from 'react';
import styled from 'styled-components';

import Popout from '../Popout';
import BulletMarker from './BulletMarker';
import ListContainer from '../List/ListContainer';
import Input from '../Input';

const ListItem = ({ id, children, content, hasChildren }) => {
  const [showMarker, setShowMarker] = useState(false);
  const [showInput, setShowInput] = useState(false);

  let inputField = null;

  if (showInput) {
    inputField = (
      <ListContainer>
        <Input
          isChild={true}
          parentID={id}
          closeInput={setShowInput} />
      </ListContainer>
    );
  }

  const clickHandler = () => {
    if (hasChildren) {
      setShowMarker(!showMarker)
    } else {
      setShowInput(!showInput);
    }
  };

  return (
    <StyledItem>
      <StyledContainer>
        <BulletMarker
          clicked={clickHandler}
          hasChildren={hasChildren}
          showedMarker={showMarker} />
        <StyledContent>{content}</StyledContent>
        <Popout />
      </StyledContainer>
      {inputField}
      {!showMarker ? children : null}
    </StyledItem>
  );
};

const StyledItem = styled.li`
  position: relative;
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;

  &:hover {
    background-color: rgba(4, 4, 5, 0.07);
  }

  &:hover div:last-of-type {
    display: flex;
  }
`;

const StyledContent = styled.div`
  padding: 10px;
  padding-left: 25px;
  width: 100%;
`;

export default ListItem;