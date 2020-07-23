import React, { useEffect } from 'react';
import { auth, logout } from '../server/firebase';
import { connect } from 'react-redux';
import { requestUserAuthData } from '../store/actions';
import { saveToLocalStorage } from '../utils';
import { Redirect } from 'react-router-dom';

const Authenticated = ({ children, requestUserData, userData }) => {
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
      console.log('authenticated component');
    });

    return () => {
      unsubscribeFromAuth();
    }
  }, []);

  if (userData) {
    return children;
  }

  logout();
  return <Redirect to='/login' />;
};

const mapStateToProps = state => ({
  userData: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
  requestUserData: userData => dispatch(requestUserAuthData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
