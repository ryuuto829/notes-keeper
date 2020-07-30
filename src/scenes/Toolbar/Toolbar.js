import React from 'react';
import styled from 'styled-components';

import LeftArrowIcon from '../../shared/icons/LeftArrow';
import IconButton from './components/IconButton';
import Flex from '../../components/Flex';

const Toolbar = ({ isLocked, showSidebar, hideSidebar, toggleLock }) => {
  return (
    <Wrapper isLocked={isLocked}>
      <ToolbarWrapper align='center' >
        {isLocked ? null : <HoverArea onMouseLeave={hideSidebar} />}
        {isLocked ?
          null :
          <RotateIconButton
            icon={<LeftArrowIcon />}
            onClick={toggleLock}
            onMouseEnter={showSidebar} />}
        <span>Toolbar</span>
      </ToolbarWrapper>
    </Wrapper >
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

const ToolbarWrapper = styled(Flex)`
  height: 100%;
`;

const RotateIconButton = styled(IconButton)`
  transform: rotate(180deg);
`;

const HoverArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 232px;
  height: 100%;
`;

export default Toolbar;
