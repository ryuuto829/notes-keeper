import React from 'react';
import styled from 'styled-components';

import Branding from '../components/Branding';

const Sidebar = ({ isLocked, toggleLock }) => {
  return (
    <SidebarContainer isLocked={isLocked}>
      <Header>
        <HeaderName>User Name</HeaderName>
        <button onClick={() => toggleLock()}>no</button>
      </Header>
      <PageContainer>DAILY NOTES</PageContainer>
      <PageContainer>ALL PAGES</PageContainer>
      <h2>SHORTCUTS</h2>
      <div style={{ overflow: 'scroll' }}>
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
      </div>
      <Branding />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: absolute;
  left: ${props => props.isLocked ? '0' : '-232px'};
  top: ${props => props.isLocked ? '0' : '45px'};
  bottom: ${props => props.isLocked ? '0' : '45px'};
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
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);;
  cursor: pointer;
`;

const HeaderName = styled.h1`
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
`;

const PageContainer = styled.div`
  position: relative;
  height: 32px;
  padding: 0 8px;
  margin: 0 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgb(79 84 92 / 32%);
  }
`;

export default Sidebar;
