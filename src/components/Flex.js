// @flow
import * as React from "react";
import styled from "styled-components";

type JustifyValues =
  | "center"
  | "space-around"
  | "space-between"
  | "flex-start"
  | "flex-end";

type AlignValues =
  | "stretch"
  | "center"
  | "baseline"
  | "flex-start"
  | "flex-end";

type Props = {
  children?: React.Node,
  column?: ?boolean,
  shrink?: ?boolean,
  align?: AlignValues,
  justify?: JustifyValues,
  auto?: ?boolean,
  className?: string,
  ...
};

const Flex = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <Container {...rest} className={className}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: ${({ auto }) => (auto ? "1 1 auto" : "initial")};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-shrink: ${({ shrink }) => (shrink ? "1" : "0")};
  min-height: 0;
  min-width: 0;
`;

export default Flex;
