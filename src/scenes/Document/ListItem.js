// @flow
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

import Controls from "./Controls";
import Content from "./Content";
import Flex from "../../components/Flex";

type Props = {
  id: string,
  content: string,
  children: ?React.Node,
  level: number
};

const ListItem = ({ id, content, children, level }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Container key={id}>
      <Wrapper>
        <Controls
          children={children}
          isCollapsed={collapsed}
          clicked={() => setCollapsed(!collapsed)}
        />
        <Content
          text={content}
          id={id}
          level={level}
          hasChildren={!!children}
        />
      </Wrapper>
      <ContainerLeft isCollapsed={collapsed}>{children}</ContainerLeft>
    </Container>
  );
};

const Container = styled.div`
  font-size: 14px;
  min-height: 20px;
`;

const ContainerLeft = styled.div`
  display: ${props => (props.isCollapsed ? "none" : "block")};
  margin-left: 20px;
  border-left: 1px solid #bfccd6;
`;

const Wrapper = styled(Flex)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default ListItem;
