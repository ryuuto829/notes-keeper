// @flow
import * as React from "react";
import Icon from "./Icon";
import type { IconProps } from "../../types";

const LeftArrowLogo = (props: IconProps) => (
  <Icon {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
  </Icon>
);

export default LeftArrowLogo;
