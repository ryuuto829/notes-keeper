import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.div`
  background-color: #40444b;
  color: rgb(220, 221, 222);
  padding: 10px;
  border: none;
  outline: none;
  white-space: pre-wrap;
`;

const StyledContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
`;

const Input = () => {
  const [inputText, setInputText] = useState('');

  const submitHandler = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      console.log(e.target.textContent);
      setInputText(e.target.textContent);
    }
  };

  return (
    <StyledContainer onKeyDown={submitHandler}>
      <StyledInput
        contentEditable>
      </StyledInput>
    </StyledContainer>
  );
};

export default Input;