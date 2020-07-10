import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import { signInWithGoogle } from '../../../server/firebase';

const GoogleSignInButton = () => {
  return (
    <React.Fragment>
      <Divider />
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </React.Fragment>
  );
};

const Divider = styled.hr`
  line-height: 1rem;
  margin: 0;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5rem;
  margin-bottom: 10px;

  &:before {
    content: '';
    background: linear-gradient(to right, transparent, #8e9297, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }

  &:after {
    content: 'OR';
    position: relative;
    display: inline-block;
    color: black;
    padding: 0 .5rem;
    line-height: 1.5rem;
    color: #8e9297;
    background-color: #36393f;
  }
`;

export default GoogleSignInButton;