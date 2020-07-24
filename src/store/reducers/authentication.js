import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT
} from '../actions/actionTypes';
import {
  loadFromLocalStorage
} from '../../utils';

const initialState = {
  user: loadFromLocalStorage('user') || null,
  isFetching: false,
  errorMessages: {}
};

const authSignInRequest = state => {
  console.log('Auth sign in request')
  return {
    ...state,
    isFetching: true
  };
};

const authSignUpRequest = state => {
  console.log('Auth sign un request')
  return {
    ...state,
    isFetching: true
  };
};

const authSuccess = (state, { userData }) => {
  console.log('Auth sign in success')
  return {
    user: { ...userData },
    isFetching: false,
    errorMessages: {}
  };
};

const authFailure = (state, { errorMessages }) => {
  console.log('Auth sign in failure')
  return {
    ...state,
    errorMessages: { ...errorMessages },
    isFetching: false
  };
};

const authLogout = (state, action) => {
  console.log('Auth  logout')
  return {
    user: null,
    isFetching: false,
    errorMessages: {}
  };
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN_REQUEST: return authSignInRequest(state);
    case AUTH_SIGN_UP_REQUEST: return authSignUpRequest(state);
    case AUTH_SUCCESS: return authSuccess(state, action);
    case AUTH_FAILURE: return authFailure(state, action);
    case AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default authentication;
