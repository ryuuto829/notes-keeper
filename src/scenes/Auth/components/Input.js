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
    <StyledInputWrapper>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput
        id={name}
        type={inputType} />
    </StyledInputWrapper>
  );
};

const StyledLabel = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 8px;
  color: #8e9297;
  font-size: 12px;
  line-height: 16px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border-radius: 3px;
  color: #dcddde;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const StyledInputWrapper = styled.div`
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