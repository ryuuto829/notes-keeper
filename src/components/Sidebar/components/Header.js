// @flow
import * as React from "react";
import styled from "styled-components";

import LeftArrowIcon from "../../../shared/icons/LeftArrow";
import Flex from "../../../components/Flex";

type Props = {
  isLocked: boolean,
  toggleLock: () => void,
  userName: string
};

const Header = ({ isLocked, toggleLock, userName }: Props) => (
  <HeaderContainer align="center" justify="space-between" onClick={toggleLock}>
    <HeaderTitle>{userName}</HeaderTitle>
    <Icon isLocked={isLocked}>
      <LeftArrowIcon />
    </Icon>
  </HeaderContainer>
);

const HeaderContainer = styled(Flex)`
  height: 48px;
  padding: 0 16px;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2), 0 1.5px 0 rgba(6, 6, 7, 0.05),
    0 2px 0 rgba(4, 4, 5, 0.05);
  transition: background-color 0.1s linear;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: rgb(79 84 92 / 16%);
  }
`;

const HeaderTitle = styled.h2`
  font-size: 14px;
  line-height: 48px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
`;

const Icon = styled(Flex)`
  fill: white;
  transition: transform 100ms ease-in;
  ${props => (props.isLocked ? null : "transform: rotate(180deg);")};
`;

export default Header;
