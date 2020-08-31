// @flow
import React from "react";
import styled from "styled-components";

import Flex from "../../../components/Flex";
import Close from "../../../shared/icons/Close";
import { moveFromTop } from "../../../shared/styles/animations";

type Props = {
  clicked: () => void
};

const ExitButton = ({ clicked }: Props) => (
  <Wrapper align="center" column onClick={clicked}>
    <Container align="center" justify="center">
      <Close size="18" />
    </Container>
    <BindText>ESC</BindText>
  </Wrapper>
);

const Container = styled(Flex)`
  flex: 0 0 36px;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  border: 2px solid #72767d;
  cursor: pointer;
  fill: #dcddde;

  &:hover {
    background-color: rgba(114, 118, 125, 0.3);
  }
`;

const BindText = styled.span`
  margin-top: 8px;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
  color: #72767d;
`;

const Wrapper = styled(Flex)`
  position: fixed;
  top: 60px;
  right: 60px;
  animation: ${moveFromTop} 300ms ease-out;

  @media (max-width: 900px) {
    top: 20px;
  }

  @media (max-width: 400px) {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export default ExitButton;
