// @flow
import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Flex from "../../Flex";

type Props = {
  to: string,
  label?: string,
  icon?: React.Element<*>,
  children?: React.Node,
  className?: string
};

const SidebarLink = ({ to, icon, children, label, className }: Props) => {
  const hasIcon = icon !== undefined;
  const hasChildren = label !== undefined && label !== "";

  return (
    <StyledNavLink to={to}>
      <LinkWrapper
        className={className}
        hasChildren={hasChildren}
        align="center"
        justify={hasChildren ? "flex-start" : "center"}
      >
        {hasIcon ? icon : null}
        {hasChildren ? <Label hasIcon={hasIcon}>{label}</Label> : null}
      </LinkWrapper>
    </StyledNavLink>
  );
};

const LinkWrapper = styled(Flex)`
  width: ${props => (props.hasChildren ? "100%" : "32px")};
  height: 32px;
  border-radius: 4px;
  color: #8e9297;
  fill: #8e9297;
  transition: all 100ms ease-in;
  padding: ${props => (props.hasChildren ? "0 6px;" : "0")};
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: rgb(79 84 92 / 32%);
    color: #dcddde;
    fill: #dcddde;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const Label = styled.span`
  ${props => (props.hasIcon ? "margin-left: 6px" : null)};
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 178px;
`;

export default SidebarLink;
