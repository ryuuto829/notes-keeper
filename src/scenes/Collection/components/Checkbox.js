// @flow
import React from "react";
import styled from "styled-components";

type Props = {
  isChecked: boolean,
  onChecked: () => void
};

const Checkbox = ({ isChecked, onChecked }: Props) => (
  <Label>
    <HiddenInput type="checkbox" checked={isChecked} onChange={onChecked} />
    <Checkmark />
  </Label>
);

const Label = styled.label`
  display: block;
  position: relative;
  font-size: 16px;
  user-select: none;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ span {
    background-color: #22bffc;
  }

  &:checked ~ span:before {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='white'/%3e%3c/svg%3e");
  }
`;

const Checkmark = styled.span`
  positon: absolute;
  border-radius: 3px;
  background-clip: padding-box;
  background-color: #f5f8fa;
  border: 0;
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
    inset 0 -1px 0 rgba(16, 22, 26, 0.1);
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  height: 1em;
  position: relative;
  user-select: none;
  vertical-align: middle;
  width: 1em;

  &:hover {
    background-color: #ebf1f5;
  }

  &:before {
    content: "";
    display: block;
    height: 1em;
    width: 1em;
  }
`;

export default Checkbox;
