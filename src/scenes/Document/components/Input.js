import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addNewListItem } from '../../../store/actions/index';

const StyledInput = styled.div`
  background-color: #40444b;
  color: rgb(220, 221, 222);
  padding: 10px;
  border: none;
  outline: none;
  white-space: pre;
  width: 100%;
`;

const StyledContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  margin: 0 10px;
`;

const Input = ({ parentID, isChild, addNewListItem, closeInput }) => {
  /** Set autofocus */
  const inputField = useRef(null);
  useEffect(() => {
    inputField.current.focus();
  });

  const submitHandler = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const text = e.target.textContent;
      closeInput(false);
      addNewListItem(text, parentID, isChild);
    }
    if (e.key === 'Escape') {
      closeInput(false);
    }
  };

  return (
    <StyledContainer
      onKeyDown={submitHandler}>
      <StyledInput
        onBlur={() => closeInput(false)}
        ref={inputField}
        contentEditable>
      </StyledInput>
    </StyledContainer >
  );
};

const mapDispatchToProps = dispatch => ({
  addNewListItem: (text, parentID, isChild) => dispatch(addNewListItem(text, parentID, isChild))
})

export default connect(null, mapDispatchToProps)(Input);