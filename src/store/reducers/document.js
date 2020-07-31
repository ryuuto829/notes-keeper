import {
  DOCUMENT_ADD_TO_SHORTCUT
} from '../actions/actionTypes';

const initialState = {
  user: loadFromLocalStorage('user') || null,
  isFetching: false,
  errorMessages: {}
};

const documentAddToShortcut = state => {
  console.log('[document] add to shortcut')
  return {
    ...state,
    isFetching: true
  };
};


const authentication = (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_ADD_TO_SHORTCUT: return documentAddToShortcut(state, action);
    default:
      return state;
  }
};

export default authentication;
