import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import LeftArrowIcon from '../../shared/icons/LeftArrow';
import IconButton from './components/IconButton';
import Flex from '../../components/Flex';

import { authLogout } from '../../store/actions';

const Toolbar = ({ isLocked, showSidebar, hideSidebar, toggleLock, authLogout }) => {
  return (
    <Wrapper isLocked={isLocked}>
      {isLocked ? null : <HoverArea onMouseLeave={hideSidebar} />}
      <ToolbarWrapper
        isLocked={isLocked}
        align='center'
        justify={isLocked ? 'flex-end' : 'space-between'} >
        {isLocked ?
          null :
          <RightArrowButton
            icon={<LeftArrowIcon />}
            onClick={toggleLock}
            onMouseEnter={showSidebar} />}
        <Flex>
          <button onClick={authLogout}>Log out</button>
          <input type='text' />
          <Button>Add to shortcut</Button>
          <Button>Menu</Button>
        </Flex>
      </ToolbarWrapper>
    </Wrapper >
  );
};

const Wrapper = styled.div`
  height: 45px;
  position: fixed;
  width: 100%;
  padding: 0 20px;
  margin-left: ${props => props.isLocked ? '232px' : '0'};
  background-color: #36393f;
  color: white;
  /* transition: all 200ms ease-in 0s; */
  z-index: 101;
`;

const ToolbarWrapper = styled(Flex)`
  height: 100%;
  ${props => props.isLocked ? 'width: calc(100% - 232px)' : null};
`;

const RightArrowButton = styled(IconButton)`
  transform: rotate(180deg);
`;

const HoverArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 232px;
  height: 100%;
`;

const Button = styled.button`
  height: 32px;
  padding: 0 6px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  outline: 0;
  border: 0;
  color: #8e9297;
  cursor: pointer;
  transition: all 100ms ease-in;
  background-color: transparent;
  margin-left: 15px;

  &:hover {
    background-color: rgb(79 84 92 / 72%);
    color: #dcddde;
  }
`;

const mapDispatchToProps = dispatch => ({
  authLogout: () => dispatch(authLogout())
});

export default connect(null, mapDispatchToProps)(Toolbar);
