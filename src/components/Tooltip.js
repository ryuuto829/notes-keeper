// @flow
import * as React from "react";
import Tippy from "@tippyjs/react";
// $FlowFixMe just import css animation for tooltip
import "tippy.js/animations/shift-away.css";
import styled from "styled-components";

type Props = {
  content: string,
  children: React.Node,
  className?: string,
  placement?: "top" | "bottom" | "left" | "right"
};

const Tooltip = ({ content, ...rest }: Props) => {
  return (
    <StyledTippy
      {...rest}
      content={content}
      delay={250}
      animation="shift-away"
      inertia
    />
  );
};

const StyledTippy = styled(Tippy)`
  font-size: 13px;
  border-radius: 4px;
  padding: 4px 6px;
  background-color: black;
  color: white;
`;

export default Tooltip;
