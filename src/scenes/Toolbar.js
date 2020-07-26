import React from 'react';
import styled from 'styled-components';

import LeftArrowIcon from '../shared/components/LeftArrowIcon';

const Toolbar = ({ isLocked, showSidebar, hideSidebar, toggleLock }) => {
  return (
    <Wrapper isLocked={isLocked}>
      {isLocked ?
        null :
        <button
          onClick={toggleLock}
          onMouseLeave={hideSidebar}
          onMouseEnter={showSidebar}>
          <LeftArrowIcon />
        </button>}
      <span>Toolbar</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 45px;
  position: fixed;
  width: 100%;
  transition: all 200ms ease-in 0s;
  margin-left: ${props => props.isLocked ? '232px' : '0'};
  background-color: #36393f;
  color: white;
  padding: 0 20px;
  z-index: 101;
`;

export default Toolbar;
