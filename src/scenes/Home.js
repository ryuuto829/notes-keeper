import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { authLogout } from '../store/actions';

import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

const Home = ({ authLogout }) => {
  const [lockSidebar, setLockSidebar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <Sidebar
        showSidebar={showSidebar}
        toggleLock={() => setLockSidebar(!lockSidebar)}
        isLocked={lockSidebar} />
      <Toolbar
        toggleLock={() => {setLockSidebar(!lockSidebar); setShowSidebar(false)}}
        showSidebar={() => setShowSidebar(true)}
        hideSidebar={() => setShowSidebar(false)}
        isLocked={lockSidebar} />
      <MainWrapper isLocked={lockSidebar}>
        <h1>Home page can view only authorized user</h1>
        <button onClick={authLogout}>Log out</button>
      </MainWrapper>
    </div>
  )
};

const MainWrapper = styled.div`
  position: fixed;
  top: 45px;
  right: 0px;
  transition: all 200ms ease-in 0s;
  width: ${props => props.isLocked ? 'calc(100vw - 232px)' : '100%'};
  padding: 0 20px;
`;

const mapDispatchToProps = dispatch => ({
  authLogout: () => dispatch(authLogout())
});

export default connect(null, mapDispatchToProps)(Home);
