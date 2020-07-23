import React from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../store/actions';

const Home = ({ authLogout }) => {
  return (
    <div>
      <h1>Home page can view only authorized user</h1>
      <button onClick={authLogout}>Log out</button>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  authLogout: () => dispatch(authLogout())
});

export default connect(null, mapDispatchToProps)(Home);
