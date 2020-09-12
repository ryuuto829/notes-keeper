// @flow
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectShorcuts } from "../../store/modules/ui";

import LeftArrowIcon from "../../shared/icons/LeftArrow";
import IconButton from "./components/IconButton";
import Flex from "../../components/Flex";
import Button from "../../components/Button";
import OpenMenu from "../../shared/icons/OpenMenu";
import Done from "../../shared/icons/Done";
import Tooltip from "../../components/Tooltip";

type Props = {
  isLocked: boolean,
  showSidebar: () => void,
  hideSidebar: () => void,
  toggleLock: () => void
};

const Toolbar = ({ isLocked, showSidebar, hideSidebar, toggleLock }: Props) => {
  const { id } = useParams();
  const shortcutsList = useSelector(selectShorcuts);
  // Show different controls when there's no id
  const isDocument = id !== undefined;
  const shortcuted = isDocument ? shortcutsList.includes(id) : false;

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
        <ButtonGroup>
          {isDocument ? (
            <Tooltip
              content={
                shortcuted
                  ? "Remove this page from sidebar"
                  : "Show this page on your sidebar"
              }
              placement="bottom"
            >
              <Button
                bgColor="transparent"
                hoverColor="rgb(79 84 92 / 72%)"
                color="#8e9297"
                hoverTextColor="#dcddde"
                padding="0 6px"
                icon={
                  shortcuted ? <Done fill="currentColor" size={20} /> : null
                }
              >
                Favorite
              </Button>
            </Tooltip>
          ) : null}
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
        </ButtonGroup>
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

const ButtonGroup = styled(Flex)`
  & > button {
    margin-left: 6px;
  }
`;

export default Toolbar;
