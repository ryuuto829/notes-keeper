import React from 'react';
import PropTypes from 'prop-types';

import StyledInput from './components/Input';

const Input = React.forwardRef(({ text }, ref) => {

  return (
    <div>
      <StyledInput
        ref={ref}
        contentEditable
        suppressContentEditableWarning={true} >
        {text}
      </StyledInput>
      <div>escape to cancel • enter to save</div>
    </div>
  );
});

Input.propTypes = {
  text: PropTypes.string
};

export default Input;
