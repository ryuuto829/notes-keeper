// @flow
import * as React from "react";
import styled from "styled-components";

type Props = {
  bgColor?: string,
  children?: React.Node,
  className?: string,
  ...
};

const Background = ({ bgColor, children, className, ...rest }: Props) => (
  <Wrapper {...rest} className={className} bgColor={bgColor}>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: ${props => props.bgColor || props.theme.mainBackground};
`;

export default Background;
