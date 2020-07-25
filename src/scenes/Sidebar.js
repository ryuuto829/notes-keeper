import React from 'react';
import styled from 'styled-components';

import Branding from '../components/Branding';
import LeftArrowIcon from '../shared/components/LeftArrowIcon';

const Sidebar = ({ isLocked, toggleLock, showSidebar }) => {
  return (
    <SidebarContainer
      showSidebar={showSidebar}
      isLocked={isLocked}>
      <Header onClick={() => toggleLock()}>
        <HeaderTitle>User Name</HeaderTitle>
        <Button isLocked={isLocked}>
          <LeftArrowIcon />
        </Button>
      </Header>
      <SectionContainer>
        <PageContainer>DAILY NOTES</PageContainer>
        <PageContainer>ALL PAGES</PageContainer>
      </SectionContainer>
      <SectionTitle>SHORTCUTS</SectionTitle>
      <Scrollable>
        <PageContainer>PAGE 1</PageContainer>
        <PageContainer>PAGE 2</PageContainer>
        <PageContainer>PAGE 3</PageContainer>
        <PageContainer>PAGE 4</PageContainer>
        <PageContainer>PAGE 5</PageContainer>
        <PageContainer>PAGE 6</PageContainer>
        <PageContainer>PAGE 7</PageContainer>
        <PageContainer>PAGE 8</PageContainer>
        <PageContainer>PAGE 9</PageContainer>
        <PageContainer>PAGE 10</PageContainer>
        <PageContainer>PAGE 11</PageContainer>
        <PageContainer>PAGE 12</PageContainer>
        <PageContainer>PAGE 13</PageContainer>
        <PageContainer>PAGE 14</PageContainer>
        <PageContainer>PAGE 15</PageContainer>
        <PageContainer>PAGE 16</PageContainer>
      </Scrollable>
      {/* <Branding /> */}
      {/* <div>ver. 1.0.0</div> */}
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
  border-right: 5px red solid; /** Invisible hover area */
  box-sizing: content-box;
  z-index: 999;

  &:hover {
    left: ${props => props.isLocked ? 'inherit' : '0'};
  }
`;

const Header = styled.header`
  height: 48px;
  flex: 1 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);;
  transition: background-color .1s linear;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: rgb(79 84 92 / 16%);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 16px;
  line-height: 48px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  line-height: 20px;
  padding: 0 16px;
  margin: 0;
  margin-bottom: 12px;
  flex: 1 0;
  color: #8e9297;
`;

const PageContainer = styled.div`
  height: 32px;
  padding: 0 8px;
  margin: 0 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #8e9297;
  cursor: pointer;
  transition: all 100ms ease-in;

  &:hover {
    background-color: rgb(79 84 92 / 32%);
    color: #dcddde;
  }
`;

const Scrollable = styled.div`
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

const SectionContainer = styled.section`
  padding: 16px 0;
`;

export default Sidebar;
