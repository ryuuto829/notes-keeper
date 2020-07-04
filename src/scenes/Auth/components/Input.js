import React from 'react';
import styled from 'styled-components';

const Input = () => {
  return (
    <StyledInputWrapper>
      <StyledLabel htmlFor='email-input'>EMAIL</StyledLabel>
      <StyledInput id='email-input' type='text' />
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

export default Input;