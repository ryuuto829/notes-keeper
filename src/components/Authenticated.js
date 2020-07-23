import React from 'react';
import { logout } from '../server/firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Authenticated = ({ children, userData }) => {
  if (userData) return children;

  logout();
  return <Redirect to='/login' />;
};

const mapStateToProps = state => ({
  userData: state.authentication.user,
});

export default connect(mapStateToProps)(Authenticated);
