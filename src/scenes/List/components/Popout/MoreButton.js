import React from 'react';
import PopoutButton from './PopoutButton';

const MoreButton = ({ clicked }) => (
  <PopoutButton
    clicked={clicked}
    name="more-button">
    <path d="M0 0h24v24H0z" fill="none" /><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
  </PopoutButton>
);

export default MoreButton;