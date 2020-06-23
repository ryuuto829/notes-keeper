import React, { useState } from 'react';
import styled from 'styled-components';

import Popout from '../Popout';
import BulletMarker from './BulletMarker';

const StyledItem = styled.li`
 position: relative;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: top;

  &:hover {
    background-color: rgba(4, 4, 5, 0.07);
  }
`;

const StyledContent = styled.div`
  padding: 10px;
  padding-left: 30px;
`;

const ListItem = ({ children, content, hasChildren }) => {
  const [showMarker, setShowMarker] = useState(false);

  return (
    <StyledItem>
      <StyledContainer>
        <BulletMarker
          hasChildren={hasChildren}
          showed={showMarker}
          onShowedChange={setShowMarker} />
        <StyledContent>{content}</StyledContent>
        <Popout />
      </StyledContainer>
      {!showMarker ? children : null}
    </StyledItem>
  );
};

export default ListItem;