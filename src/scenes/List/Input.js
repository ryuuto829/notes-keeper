import React from 'react';
import PropTypes from 'prop-types';

import StyledInput from './components/Input';

const Input = ({ text, isEdit, submitedTextInput }) => {
  const onInputSubmitHandler = e => {
    if (e.key !== 'Enter') {
      if (isEdit) {
        submitedTextInput(e.target.textContent);
      } else {
        submitedTextInput(e.target.textContent);
      }
    }
  };

  return (
    <div>
      <StyledInput
        contentEditable
        suppressContentEditableWarning={true}
        onKeyDown={e => onInputSubmitHandler(e)} >
        {text}
      </StyledInput>
      <div>escape to cancel • enter to save</div>
    </div>
  );
};

Input.propTypes = {
  submitedTextInput: PropTypes.func.isRequired,
  text: PropTypes.string,
  isEdit: PropTypes.bool
};

export default Input;
