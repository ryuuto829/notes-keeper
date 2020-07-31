import {
  UI_UPDATE_SHORTCUTS
} from '../actions/actionTypes';

const initialState = {
  shortcuts: {
    'id1': 'My First Page',
    'id2': 'My Second Page'
  }
};

const uiUpdateShortcuts = (state, { shortcuts }) => {
  console.log('[UI] Get shortcuts')
  return {
    ...state,
    shortcuts: shortcuts  
  };
};


const collection = (state = initialState, action) => {
  switch (action.type) {
    case UI_UPDATE_SHORTCUTS: return uiUpdateShortcuts(state, action);
    default:
      return state;
  }
};

export default collection;
