import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { authLogout } from '../store/actions';

import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

const Home = ({ authLogout }) => {
  const [lockSidebar, setLockSidebar] = useState(true);

  return (
    <div>
      <Sidebar
        toggleLock={() => setLockSidebar(!lockSidebar)}
        isLocked={lockSidebar} />
      <Toolbar
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
  right: 0px;
  transition: all 200ms ease-in 0s;
  width: ${props => props.isLocked ? 'calc(100vw - 232px)' : '100%'};
  padding: 0 20px;
`;

const mapDispatchToProps = dispatch => ({
  authLogout: () => dispatch(authLogout())
});

export default connect(null, mapDispatchToProps)(Home);
