import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useAuth, auth } from "../server/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout, authRequest, authFailure } from "../store/modules/auth";
import { updateUser } from "../store/modules/user";
import { selectAuthenticated, selectInitializing } from "../store/modules/auth";

import LoaderBar from "./LoaderBar";

const Authenticated = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  const isInitializing = useSelector(selectInitializing);

  const [state, setState] = useState(() => {
    const user = auth.currentUser;
    return { initializing: !user, user };
  });

  const onChange = user => {
    if (!state.initializing) {
      dispatch(authRequest({ user: user }));
    }
    setState({ initializing: false, user });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  // const { initializing, user } = useAuth();

  // useEffect(() => {
  //   if (initializing === false) {
  //     dispatch(authRequest({ user: user }));
  //   }
  // }, [initializing]);

  if (isInitializing) {
    return (
      <Background>
        <LoaderBar />
      </Background>
    );
  }

  if (isAuthenticated) return children;
  // dispatch(logout());
  return <Redirect to="/login" />;
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
