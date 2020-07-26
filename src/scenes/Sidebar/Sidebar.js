import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SidebarLink from './components/SidebarLink';
import Branding from '../../components/Branding';
import EventNoteIcon from '../../shared/components/EventNoteIcon';
import TableIcon from '../../shared/components/TableIcon';
import SettingsIcon from '../../shared/components/SettingsIcon';

import Header from './components/Header';

const Sidebar = ({ isLocked, toggleLock, showSidebar, userName }) => {
  return (
    <SidebarContainer
      showSidebar={showSidebar}
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

      <SettingsSection>
        <Branding size={24} />
        <Button isLocked={isLocked}>
          <SettingsIcon />
        </Button>
      </SettingsSection>

    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  left: ${props => props.isLocked ? '0' : '-232px'};
  top: ${props => props.isLocked ? '0' : '45px'};
  bottom: ${props => props.isLocked ? '0' : '45px'};
  ${props => props.showSidebar && !props.isLocked ? 'left: 0;' : null};
  background-color: #2f3136;
  color: white;
  width: 232px;
  display: flex;
  flex-direction: column;
  transition: all 200ms ease-in;
  border-right: 5px solid #36393f; /** Invisible hover area */
  box-sizing: content-box;
  z-index: 999;

  &:hover {
    left: ${props => props.isLocked ? 'inherit' : '0'};
  }
`;

const SectionTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  padding: 0 16px;
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

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  fill: white;
  border-radius: 3px;
  padding: 2px;
  outline: 0;
  border: none;
  transition: transform 100ms ease-in;
  ${props => props.isLocked ? null : 'transform: rotate(180deg);'};
  cursor: pointer;
`;

const SectionContainer = styled.nav`
  padding: 16px 0;
`;

const SettingsSection = styled.section`
  padding:  16px;
  background-color: #292b2f;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const mapStateToProps = state => ({
  userName: state.authentication.user.displayName
})

export default connect(mapStateToProps)(Sidebar);
