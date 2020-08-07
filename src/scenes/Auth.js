import React from "react";
import styled from "styled-components";
import { useAuth } from "../server/firebase";
import LoaderBar from "../components/LoaderBar";

import { Redirect } from "react-router-dom";
import { logout, authRequest, authFailure } from "../store/modules/auth";
import { updateUser } from "../store/modules/user";
import { selectAuthenticated, selectInitializing } from "../store/modules/auth";

const AuthProvider = () => {
  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user };
  });

  const onChange = user => {
    setState({ initializing: false, user });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  if (initializing) {
    <Background>
      <LoaderBar />
    </Background>;
  }

  if (user) return children;
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

export default AuthProvider;
