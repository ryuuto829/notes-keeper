import React, { useEffect } from 'react';
import { auth } from '../server/firebase';
import { connect } from 'react-redux';
import { requestUserAuthData } from '../store/actions';
import { saveToLocalStorage } from '../utils';

const Authenticated = ({ children, requestUserData }) => {
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      const userData = {
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          creationTime: user.metadata.a,
          lastSignInTime: user.metadata.b,
        }
      };
      
      saveToLocalStorage('user', userData);
      requestUserData(userData);
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
