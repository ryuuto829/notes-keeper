import React, { useEffect } from 'react';
import { auth } from '../server/firebase';
import { connect } from 'react-redux';
import { requestUserAuthData } from '../store/actions';

const Authenticated = ({ children, requestUserData }) => {
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      requestUserData(user);
      console.log(user);
    });

    return () => {
      unsubscribeFromAuth();
    }
  }, []);

  return children;
};

const mapDispatchToProps = dispatch => ({
  requestUserData: userData => dispatch(requestUserAuthData(userData))
});

export default connect(null, mapDispatchToProps)(Authenticated);
