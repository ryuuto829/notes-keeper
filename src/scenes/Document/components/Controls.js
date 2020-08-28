// @flow
import * as React from "react";
import styled from "styled-components";

import Flex from "../../../components/Flex";

type Props = {
  clicked: () => void,
  isCollapsed: boolean,
  children: ?React.Node
};

const Controls = ({ clicked, isCollapsed, children }: Props) => {
  const hasChildren = children !== null;

  if (hasChildren) {
    return (
      <Wrapper justify="center">
        <BulletOuter
          justify="center"
          align="center"
          hasChildren={hasChildren}
          onClick={clicked}
          isCollapsed={isCollapsed}
        >
          <BulletInner />
        </BulletOuter>
      </Wrapper>
    );
  }

  return (
    <Wrapper justify="center">
      <BulletOuter justify="center" align="center">
        <BulletInner />
      </BulletOuter>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  flex: 0 0 40px;
  padding: 4px 0;
`;

const BulletOuter = styled(Flex)`
  height: 13px;
  width: 13px;
  margin-top: 3px;
  border-radius: 50%;
  ${props => (props.isCollapsed ? "background-color: #72767d" : null)};
  ${props => (props.hasChildren ? "cursor: pointer" : null)};
`;

const BulletInner = styled.span`
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background-color: #dcddde;
`;

export default Controls;
