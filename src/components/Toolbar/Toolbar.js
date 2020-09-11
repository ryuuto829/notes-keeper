// @flow
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../store/modules/login"; // DELETE LATER

import LeftArrowIcon from "../../shared/icons/LeftArrow";
import IconButton from "./components/IconButton";
import Flex from "../../components/Flex";
import Button from "../../components/Button";
import OpenMenu from "../../shared/icons/OpenMenu";
import Tooltip from "../../components/Tooltip";

type Props = {
  isLocked: boolean,
  showSidebar: () => void,
  hideSidebar: () => void,
  toggleLock: () => void
};

const Toolbar = ({ isLocked, showSidebar, hideSidebar, toggleLock }: Props) => {
  const dispatch = useDispatch();

  return (
    <Wrapper isLocked={isLocked}>
      {isLocked ? null : <HoverArea onMouseLeave={hideSidebar} />}
      <ToolbarWrapper
        isLocked={isLocked}
        align="center"
        justify={isLocked ? "flex-end" : "space-between"}
      >
        {isLocked ? null : (
          <Tooltip content="Lock sidebar open" placement="bottom">
            <span>
              <RightArrowButton
                icon={<LeftArrowIcon />}
                onClick={toggleLock}
                onMouseEnter={showSidebar}
              />
            </span>
          </Tooltip>
        )}
        <Flex>
          <button onClick={() => dispatch(logoutRequest())}>Log out</button>
          <Tooltip content="Style and more .." placement="bottom">
            <Button
              bgColor="transparent"
              hoverColor="rgb(79 84 92 / 72%)"
              color="#8e9297"
              hoverTextColor="#dcddde"
              padding="0 6px"
              icon={<OpenMenu fill="currentColor" />}
            />
          </Tooltip>
        </Flex>
      </ToolbarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 48px;
  position: fixed;
  width: 100%;
  padding: 0 20px;
  margin-left: ${props => (props.isLocked ? "232px" : "0")};
  background-color: #36393f;
  color: white;
  z-index: 101;
`;

const ToolbarWrapper = styled(Flex)`
  height: 100%;
  ${props => (props.isLocked ? "width: calc(100% - 232px)" : null)};
`;

const RightArrowButton = styled(IconButton)`
  transform: rotate(180deg);
`;

const HoverArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 232px;
  height: 100%;

  @media (max-width: 600px) {
    width: 0;
  }
`;

export default Toolbar;
