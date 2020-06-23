import React from 'react';
import styled from 'styled-components';

const StyledMarkerContainer = styled.div`
  cursor: pointer;
`;

const StyledIcon = styled.svg`
  display: ${({ showed }) => showed ? "block" : "none"};
  width: 20px;
  height: 20px;
  object-fit: contain;
  position: absolute;
  top: 10px;
  left: 0;
`;

const BulletMarker = ({ showedMarker, showedInput, toggleMarker, hasChildren, toggleInput }) => {

  const clickHandler = () => {

    if (hasChildren) {
      toggleMarker(!showedMarker)
    } else {
      toggleInput(!showedInput);
      console.log('create a new list');
    }
  };

  return (
    <StyledMarkerContainer
      onClick={clickHandler}>
      <StyledIcon
        showed={showedMarker && hasChildren}
        focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"></path></StyledIcon>
      <StyledIcon
        showed="true"
        focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z" fill="currentColor"></path></StyledIcon>
    </StyledMarkerContainer>
  );
};

export default BulletMarker;