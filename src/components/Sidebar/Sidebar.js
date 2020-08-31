// @flow
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/modules/login";

import Shortcuts from "./Shortcuts";
import Header from "./components/Header";
import SidebarLink from "./components/SidebarLink";
import Branding from "../../components/Branding";
import Flex from "../../components/Flex";
import EventNoteIcon from "../../shared/icons/EventNote";
import TableIcon from "../../shared/icons/Table";
import SettingsIcon from "../../shared/icons/Settings";

type Props = {
  isLocked: boolean,
  toggleLock: () => void,
  showedSidebar: boolean,
  hideSidebar: () => void,
  showSidebar: () => void
};

const Sidebar = ({
  isLocked,
  toggleLock,
  showedSidebar,
  hideSidebar,
  showSidebar
}: Props) => {
  const user = useSelector(selectUser);

  return (
    <>
      {!isLocked ? (
        <HoverArea onMouseEnter={showSidebar} onMouseLeave={hideSidebar} />
      ) : null}
      <SidebarContainer column showSidebar={showedSidebar} isLocked={isLocked}>
        <Header
          isLocked={isLocked}
          userName={user ? user.displayName || "" : "userName"}
          toggleLock={toggleLock}
        />
        <SectionContainer>
          <SidebarLink
            to="/home"
            icon={<EventNoteIcon size={20} />}
            label="DAILY NOTES"
          />
          <SidebarLink
            to="/collection"
            icon={<TableIcon size={20} />}
            label="ALL PAGES"
          />
        </SectionContainer>
        <Shortcuts />
        <SettingsSection justify="space-between" align="center">
          <Branding size={24} />
          <SidebarLink to="/settings" icon={<SettingsIcon size={20} />} />
        </SettingsSection>
      </SidebarContainer>
    </>
  );
};

const SidebarContainer = styled(Flex)`
  position: absolute;
  left: ${props => (props.isLocked ? "0" : "-232px")};
  top: ${props => (props.isLocked ? "0" : "45px")};
  bottom: ${props => (props.isLocked ? "0" : "45px")};
  ${props => (props.showSidebar && !props.isLocked ? "left: 0" : null)};
  background-color: #2f3136;
  color: white;
  width: 232px;
  transition: all 200ms ease-in;
  box-sizing: content-box;
  z-index: 999;
  ${props =>
    !props.isLocked
      ? `box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px,
       rgba(0, 0, 0, 0.19) 0px 6px 20px 0px`
      : null};

  &:hover {
    left: ${props => (props.isLocked ? "inherit" : "0")};
  }

  /* Auto hiding sidebar for mobile devices or small screens. In this case
  * HOVER WOULDN'T WORK, and 'isLocked' will serve as a toogle button  */
  @media (max-width: 600px) {
    left: ${props => (props.isLocked ? "0" : "-232px")};
    top: 0;
    bottom: 0;

    &:hover {
      left: ${props => (props.isLocked ? "inherit" : "-232px")};
    }
  }
`;

const HoverArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  z-index: 102;

  @media (max-width: 600px) {
    width: 0;
  }
`;

const SectionContainer = styled.nav`
  padding: 16px 8px;
`;

const SettingsSection = styled(Flex)`
  height: 52px;
  padding: 0 16px;
  background-color: #292b2f;
  margin-top: 12px;
  font-size: 13px;
`;

export default Sidebar;
