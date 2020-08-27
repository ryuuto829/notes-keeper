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
  top: 48px;
  right: 0px;
  transition: all 200ms ease-in 0s;
  width: ${props => (props.isLocked ? "calc(100vw - 232px)" : "100%")};
  padding: 0 20px;
  background-color: #36393f;
  color: #dcddde;
  height: calc(100% - 45px);

  &:before {
    content: "";
    position: absolute;
    display: block;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
      0 2px 0 rgba(4, 4, 5, 0.05);
    z-index: 1;
    pointer-events: none;
  }

  /* On small screen sidebar wouldn't push document, but slide on top of it */
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default Layout;
