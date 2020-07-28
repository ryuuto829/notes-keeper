import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SidebarLink from './components/SidebarLink';
import Branding from '../../components/Branding';
import EventNoteIcon from '../../shared/components/EventNoteIcon';
import TableIcon from '../../shared/components/TableIcon';
import SettingsIcon from '../../shared/components/SettingsIcon';

import Header from './components/Header';
import Flex from '../../components/Flex';

const Sidebar = ({ isLocked, toggleLock, showedSidebar, hideSidebar, showSidebar, userName }) => {
  return (
    <React.Fragment>
      {!isLocked ?
        <HoverArea
          onMouseEnter={showSidebar}
          onMouseLeave={hideSidebar} /> :
        null}
      <SidebarContainer
        column
        showSidebar={showedSidebar}
        isLocked={isLocked}>
        <Header
          isLocked={isLocked}
          userName={userName}
          toggleLock={toggleLock} />
        <SectionContainer>
          <SidebarLink
            to='/somelink'
            icon={<EventNoteIcon />}>DAILY NOTES</SidebarLink>
          <SidebarLink
            to='/somelink'
            icon={<TableIcon />}>ALL PAGES</SidebarLink>
        </SectionContainer>
        <SectionTitle>SHORTCUTS</SectionTitle>
        <Scrollable>
          {/* Render user pages */}
          {[...Array(15).keys()].map(el => (
            <SidebarLink
              key={el}
              to='/somelink'>PAGE {el + 1}</SidebarLink>
          ))}
        </Scrollable>
        <SettingsSection
          justify='space-between'
          align='center'>
          <Branding size={24} />
          <SidebarLink
            to='/settings'
            icon={<SettingsIcon />} />
        </SettingsSection>
      </SidebarContainer>
    </React.Fragment>
  );
};

const SidebarContainer = styled(Flex)`
  position: absolute;
  left: ${props => props.isLocked ? '0' : '-232px'};
  top: ${props => props.isLocked ? '0' : '45px'};
  bottom: ${props => props.isLocked ? '0' : '45px'};
  ${props => props.showSidebar && !props.isLocked ? 'left: 0' : null};
  background-color: #2f3136;
  color: white;
  width: 232px;
  transition: all 200ms ease-in;
  /* border-right: 5px solid #36393f; * Invisible hover area */
  box-sizing: content-box;
  z-index: 999;
  ${props => !props.isLocked ? 'box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px' : null};
  

  &:hover {
    left: ${props => props.isLocked ? 'inherit' : '0'};
  }
`;

const HoverArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  z-index: 102;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
  padding: 0 14px;
  margin: 0;
  margin-bottom: 12px;
  flex: 1 0;
  color: #8e9297;
`;

const Scrollable = styled.nav`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: none;
  padding: 0 8px;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const SectionContainer = styled.nav`
  padding: 16px 8px;
`;

const SettingsSection = styled(Flex)`
  flex: 1 0 auto;
  height: 52px;
  padding: 0 16px;
  background-color: #292b2f;
  margin-top: 12px;
`;

const mapStateToProps = state => ({
  userName: state.authentication.user.displayName
})

export default connect(mapStateToProps)(Sidebar);
