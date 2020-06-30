import React from 'react';
import styled from 'styled-components';

import BulletMarker from './BulletMarker';
import Popout from './Popout';

const ListContent = ({ hasChildren, showedMarker, clicked, added, edited, deleted, content }) => (
  <StyledContentContainer>
    <BulletMarker
      hasChildren={hasChildren}
      showedMarker={showedMarker}
      clicked={clicked} />
    <StyledListContent>
      {content}
    </StyledListContent>
    <Popout
      added={added}
      edited={edited}
      deleted={deleted} />
  </StyledContentContainer>
);

const StyledContentContainer = styled.div`
  position: relative;

  &:hover {
    background-color: rgba(4, 4, 5, 0.15);
  }

  &:hover div:last-of-type {
    display: flex;
  }
`;

const StyledListContent = styled.div`
  padding-left: 26px;
  line-height: 1.4;
`;

export default ListContent;