// @flow
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar/Toolbar";
import Background from "./Background";

type Props = {
  children?: React.Node
};

const Layout = ({ children }: Props) => {
  const [lockSidebar, setLockSidebar] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Background bgColor="#36393f">
      <Sidebar
        showedSidebar={showSidebar}
        hideSidebar={() => setShowSidebar(false)}
        showSidebar={() => setShowSidebar(true)}
        toggleLock={() => setLockSidebar(!lockSidebar)}
        isLocked={lockSidebar}
      />
      <Toolbar
        toggleLock={() => {
          setLockSidebar(!lockSidebar);
          setShowSidebar(false);
        }}
        showSidebar={() => setShowSidebar(true)}
        hideSidebar={() => setShowSidebar(false)}
        isLocked={lockSidebar}
      />
      <MainWrapper isLocked={lockSidebar}>{children}</MainWrapper>
    </Background>
  );
};

const MainWrapper = styled.div`
  position: fixed;
  top: 45px;
  right: 0px;
  transition: all 200ms ease-in 0s;
  width: ${props => (props.isLocked ? "calc(100vw - 232px)" : "100%")};
  padding: 0 20px;
  background-color: #36393f;
  color: white;
  height: calc(100% - 45px);

  /* On small screen sidebar wouldn't push document, but slide on top of it */
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default Layout;
