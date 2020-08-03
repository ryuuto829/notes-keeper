import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Sidebar from '../scenes/Sidebar/Sidebar';
import Toolbar from '../scenes/Toolbar/Toolbar';

const Layout = ({ children }) => {
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
        {children}
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

Layout.propTypes = {
  /** Show current document */
  children: PropTypes.node
};

export default Layout;