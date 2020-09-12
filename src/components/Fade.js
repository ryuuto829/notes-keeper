// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  show: ?string,
  children?: React.Node,
  timing?: string
};

// Thanks to author of this post
// https://czaplinski.io/blog/super-easy-animation-with-react-hooks/
const Fade = ({ timing, show, children }: Props) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) setShouldRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setShouldRender(false);
  };

  // When component unmounts -> show animation
  return (
    shouldRender && (
      <Wrapper show={show} onAnimationEnd={onAnimationEnd} timing={timing}>
        {children}
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  ${props =>
    `animation: ${!props.show ? "fadeOut" : null} ${props.timing || "250ms"}`};

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default Fade;
