// @flow
import * as React from "react";
import styled from "styled-components";

type Props = {
  icon: React.Node
};

const IconButton = ({ icon, ...rest }: Props) => {
  return <Button {...rest}>{icon}</Button>;
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 32px;
  height: 32px;
  fill: #b9bbbe;
  border-radius: 3px;
  outline: 0;
  padding: 0;
  margin: 0;
  border: none;
  transition: transform 100ms ease-in;
  cursor: pointer;

  &:hover {
    background-color: rgb(79 84 92 / 32%);
    fill: #dcddde;
  }
`;

export default IconButton;
