import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_LOGOUT
} from '../actions/actionTypes';
import {
  loadFromLocalStorage
} from '../../utils';

const initialState = {
  ...loadFromLocalStorage('user') || null,
  isFetching: false
};

const authSignInRequest = (state, action) => {
  console.log('Auth sign in request')
  return {
    ...state,
    isFetching: true
  };
};

const authSignInSuccess = (state, { userData }) => {
  console.log('Auth sign in success')
  return {
    ...state,
    user: { ...userData },
    isFetching: false
  };
};

const authSignInFailure = (state, { errorMessages }) => {
  console.log('Auth sign in failure')
  return {
    ...state,
    errorMessages: { ...errorMessages },
    isFetching: false
  };
};

const authLogout = (state, action) => {
  console.log('Auth  logout')
  return {};
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN_REQUEST: return authSignInRequest(state, action);
    case AUTH_SIGN_IN_SUCCESS: return authSignInSuccess(state, action);
    case AUTH_SIGN_IN_FAILURE: return authSignInFailure(state, action);
    case AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default authentication;
