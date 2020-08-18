// @flow
import * as React from "react";
import styled from "styled-components";

type Props = {
  name: string,
  label?: ?string,
  type: string,
  value: string,
  onChangeHandler: (e: SyntheticEvent<>) => void,
  errorMessages?: ?string,
  className?: string,
  ...
};

const Input = (props: Props) => {
  const {
    name,
    type,
    label,
    value,
    onChangeHandler,
    errorMessages,
    className,
    ...rest
  } = props;

  const isValid = errorMessages === undefined || errorMessages === null;
  const hasLabel = label !== undefined && label !== null;

  const LabelBox = (
    <Label isValid={isValid} htmlFor={label}>
      {label}
      <InvalidMessage isValid={isValid}>{errorMessages || null}</InvalidMessage>
    </Label>
  );

  return (
    <React.Fragment>
      {hasLabel ? LabelBox : null}
      <InputField
        {...rest}
        className={className}
        id={name}
        name={name}
        spellCheck={false}
        type={type}
        isValid={isValid}
        value={value}
        onChange={onChangeHandler}
      />
    </React.Fragment>
  );
};

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 8px;
  color: ${props => (props.isValid ? props.theme.label : props.theme.danger)};
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  transition: color 0.2s ease-in-out;
`;

const InvalidMessage = styled.span`
  opacity: ${({ isValid }) => (isValid ? "0" : "1")};
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
  color: #f04747;
  transition: opacity 0.2s ease-in-out;

  &:before {
    content: "-";
    display: ${({ isValid }) => (isValid ? "none" : "inline")};
    padding: 0 4px;
  }
`;

const InputField = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border-radius: 3px;
  color: ${props => props.theme.textNormal};
  outline: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-color: ${props =>
    props.isValid ? "rgba(0, 0, 0, 0.3)" : props.theme.danger};
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: ${props => (props.isValid ? "#7289da" : props.theme.danger)};
  }

  &:hover:not(:focus) {
    border-color: ${props => (props.isValid ? "#040405" : props.theme.danger)};
  }
`;

export default Input;
