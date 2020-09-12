// @flow
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Fade from "./Fade";
import Flex from "./Flex";
import Close from "../shared/icons/Close";
import { zoomIn } from "../shared/styles/animations";

type Props = {
  show: ?string,
  content: ?string,
  autoCloseIn?: number,
  closed?: () => void,
  danger?: boolean,
  success?: boolean
};

const Snackbar = ({ autoCloseIn, show, content, closed, ...rest }: Props) => {
  // We store message in state to prevent content text dissapear
  // when component unmounts and then show fade animation
  const [message, setMessage] = useState(show);

  // Auto close modal after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
      closed();
    }, autoCloseIn || 3000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <Fade show={show}>
      <MessageBox align="center" justify="space-between" {...rest}>
        <Text>{message || show}</Text>
        {closed ? (
          <Button as="button" align="center" justify="center" onClick={closed}>
            <Close size={20} />
          </Button>
        ) : null}
      </MessageBox>
    </Fade>
  );
};

const MessageBox = styled(Flex)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: #43b581;
  font-size: 14px;
  ${props => (props.danger ? "background-color: #f04747" : null)};
  ${props => (props.success ? "background-color: #43b581" : null)};
  padding: 6px 16px;
  border-radius: 4px;
  color: #fff;
  fill: #fff;
  line-height: 30px;
  min-width: 288px;
  animation: ${zoomIn} 200ms ease-out;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const Text = styled.span`
  margin-right: 5px;
`;

const Button = styled(Flex)`
  padding: 4px;
  border: 0;
  border-radius: 50%;
  outline: 0;
  background: 0;
  height: 28px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 250ms ease-in;

  &:hover {
    background-color: rgba(1, 1, 1, 0.1);
  }
`;

export default Snackbar;
