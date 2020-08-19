// @flow
import * as React from "react";
import type { IconProps } from "../../types";

type BaseProps = {
  children?: React.Node
};

const Icon = (props: BaseProps & IconProps) => {
  const { children, className, size, ...rest } = props;
  const realSize = size ? size + "px" : "24px";
  return (
    <svg
      {...rest}
      width={realSize}
      height={realSize}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {children}
    </svg>
  );
};

export default Icon;
