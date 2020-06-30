import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BulletIcon from './BulletIcon';

const Input = React.forwardRef(({ text }, ref) => {
  /** Set autofocus on input */
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div>
      <BulletIcon />
      <StyledInput
        ref={ref}
        contentEditable
        suppressContentEditableWarning={true} >
        {text}
      </StyledInput>
      <StyledHelperText>
        <StyledHighlightedText>escape </StyledHighlightedText>
         to cancel •
         <StyledHighlightedText> enter </StyledHighlightedText>
          to save
        </StyledHelperText>
    </div>
  )
});

const StyledInput = styled.div`
  background-color: #40444b;
  margin-left: 26px;
  padding: 10px;
  border-radius: 5px;
`;

const StyledHelperText = styled.div`
  font-size: 0.7rem;
  margin-left: 26px;
  padding: 3px;
`;

const StyledHighlightedText = styled.span`
  color: #7289da;
`;

Input.propTypes = {
  text: PropTypes.string
};

export default Input;
