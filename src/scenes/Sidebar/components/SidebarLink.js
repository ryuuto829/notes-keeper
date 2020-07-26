import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = ({ to, icon, children }) => {
  const hasIcon = icon !== undefined;

  return (
    <StyledNavLink to={to} >
      {hasIcon ? icon : null}
      <Label hasIcon={hasIcon}>
        {children}
      </Label>
    </StyledNavLink >
  );
};

const StyledNavLink = styled(NavLink)`
  height: 32px;
  padding: 0 8px;
  margin: 0 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #8e9297;
  fill: #8e9297;
  cursor: pointer;
  transition: all 100ms ease-in;
  text-decoration: none;

  &:hover {
    background-color: rgb(79 84 92 / 32%);
    color: #dcddde;
  }
`;

const Label = styled.span`
  ${props => props.hasIcon ? 'margin-left: 6px' : null};
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

SidebarLink.propTypes = {
  /** Path to the route, ex. '/home', '/login' */
  to: PropTypes.string.isRequired,
  icon: PropTypes.element,
  children: PropTypes.node,
};

export default SidebarLink;