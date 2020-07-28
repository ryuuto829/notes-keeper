import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { authLogout } from '../store/actions';

import Sidebar from './Sidebar/Sidebar';
import Toolbar from './Toolbar/Toolbar';
// import List from './List';

const Home = ({ authLogout }) => {
  const [lockSidebar, setLockSidebar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <PageContainer>
      <Sidebar
        showedSidebar={showSidebar}
        hideSidebar={() => setShowSidebar(false)}
        showSidebar={() => setShowSidebar(true)}
        toggleLock={() => setLockSidebar(!lockSidebar)}
        isLocked={lockSidebar} />
      <Toolbar
        toggleLock={() => { setLockSidebar(!lockSidebar); setShowSidebar(false) }}
        showSidebar={() => setShowSidebar(true)}
        hideSidebar={() => setShowSidebar(false)}
        isLocked={lockSidebar} />
      <MainWrapper isLocked={lockSidebar}>
        {/* <List /> */}
        <h1>Home page can view only authorized user</h1>
        <button onClick={authLogout}>Log out</button>
      </MainWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #36393f;
`;

const MainWrapper = styled.div`
  position: fixed;
  top: 45px;
  right: 0px;
  transition: all 200ms ease-in 0s;
  width: ${props => props.isLocked ? 'calc(100vw - 232px)' : '100%'};
  padding: 0 20px;
  background-color: #36393f;
  color: white;
`;

const mapDispatchToProps = dispatch => ({
  authLogout: () => dispatch(authLogout())
});

export default connect(null, mapDispatchToProps)(Home);
