import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = props => {
  const {
    name,
    label,
    inputType,
    invalidMessage,
    isValid,
    inputValue,
    changedInputValue
  } = props;

  return (
    <InputWrapper>
      <Label
        isValid={isValid}
        htmlFor={label}>
        {label}
        <InvalidMessage
          isValid={isValid}>
          {invalidMessage}
        </InvalidMessage>
      </Label>
      <InputField
        id={name}
        type={inputType}
        isValid={isValid}
        value={inputValue}
        onChange={e => changedInputValue(name, e.target.value)} />
    </InputWrapper>
  );
};

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 8px;
  color: ${({ isValid }) => isValid ? '#8e9297' : '#f04747'};
  font-size: 12px;
  line-height: 16px;
`;

const InvalidMessage = styled.span`
  display: ${({ isValid }) => isValid ? 'none' : 'inline'};
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
  color: #f04747;

  &:before {
    content: '-';
    display: inline;
    padding: 0 4px;
  }
`;

const InputField = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border-radius: 3px;
  color: #dcddde;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-color: ${({ isValid }) => isValid ? 'rgba(0, 0, 0, 0.3)' : '#f04747'};
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  invalidMessage: PropTypes.string,
  isValid: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  changedInputValue: PropTypes.func.isRequired,
};

export default Input;