// @flow
import React, { useState } from "react";
import styled from "styled-components";

import Flex from "./Flex";
import Help from "../shared/icons/Help";
import LeftArrow from "../shared/icons/LeftArrow";
import Tooltip from "./Tooltip";

const HelpPopover = () => {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <Wrapper show={show}>
        <Header align="center" justify="space-between">
          <Label>Help</Label>
          <BottomArrow onClick={() => setShow(false)} />
        </Header>
        <Item align="center" justify="space-between">
          <span>Indent Block</span>
          <Command>Tab</Command>
        </Item>
        <Item align="center" justify="space-between">
          <span>Create New Block</span>
          <Command>Enter</Command>
        </Item>
        <Item align="center" justify="space-between">
          <span>Page Reference</span>
          <Command>[[ ]]</Command>
        </Item>
      </Wrapper>
    );
  }

  return (
    <Wrapper show={show}>
      <Tooltip content="Key commands and helpful tips" placement="top">
        <Button
          as="button"
          align="center"
          justify="center"
          onClick={() => setShow(true)}
        >
          <Help />
        </Button>
      </Tooltip>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 300px;
  right: 14px;
  bottom: 6px;
  background-color: ${props => (props.show ? "#2f3136" : "transparent")};
  max-width: ${props => (props.show ? "300px" : "36px")};
  padding: 16px;
  font-size: 14px;
  border-radius: 4px;
  height: ${props => (props.show ? "152px" : "36px")};
  transition: all 200ms ease-in;
`;

const Item = styled(Flex)`
  margin-top: 10px;
`;

const Header = styled(Flex)`
  margin-bottom: 20px;
`;

const Label = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
`;

const Command = styled.span`
  color: #8e9297;
`;

const BottomArrow = styled(LeftArrow)`
  transform: rotate(270deg);
  fill: #8e9297;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    fill: #dcddde;
    background-color: rgb(79 84 92 / 32%);
  }
`;

const Button = styled(Flex)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border: 0;
  outline: 0;
  background-color: #2f3136;
  fill: #8e9297;
  border-radius: 50%;
  cursor: pointer;
  transition: all 200ms ease-in;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);

  &:hover {
    fill: #dcddde;
  }
`;
export default HelpPopover;
