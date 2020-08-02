import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useAuth, logout } from '../server/firebase';

import LoaderBar from './LoaderBar';

const Authenticated = ({ children }) => {
  const { initializing, user } = useAuth();

  if (initializing) {
    return (
      <Background>
        <LoaderBar />
      </Background>
    );
  }

  if (user) return children;

  logout();
  return <Redirect to='/login' />;
};

/** TODO: Dont repeat, create a new component */
const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mainBackground};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

Authenticated.propTypes = {
  children: PropTypes.node
};

export default Authenticated;
