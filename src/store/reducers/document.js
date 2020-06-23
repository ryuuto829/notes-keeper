import * as actionTypes from '../actions/actionTypes';

const initialState = {
  listByID: {
    id1: {
      text: 'Managing your time and motivation 1',
      children: ['id3', 'id4', 'id5']
    },
    id2: {
      text: 'Managing your time and motivation 2',
      children: ['id9', 'id10', 'id11']
    },
    id3: {
      text: 'Nested text',
      children: null
    },
    id4: {
      text: 'Nested text',
      children: null
    },
    id5: {
      text: 'Managing your time and motivation Nested',
      children: ['id6', 'id7', 'id8']
    },
    id6: {
      text: 'Nested text',
      children: null
    },
    id7: {
      text: 'Nested text',
      children: null
    },
    id8: {
      text: 'Nested text',
      children: null
    },
    id9: {
      text: 'Nested text',
      children: null
    },
    id10: {
      text: 'Nested text',
      children: null
    },
    id11: {
      text: 'Nested text',
      children: null
    },
  },
  initialIDList: ['id1', 'id2']
};

/** Delete later */
let generateID = 20;

const document = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_LIST_ITEM:

      const currId = generateID++;

      const childrenitems = state.listByID[action.parentID].children || [];
      childrenitems.push(`id${currId}`);

      if (action.isChild) {
        return {
          ...state,
          listByID: {
            ...state.listByID,
            [`id${currId}`]: {
              text: action.text,
              children: null
            },
            [action.parentID]: {
              ...state.listByID[action.parentID],
              children: [...childrenitems]
            }
          }
        };
      }
    default:
      return state;
  }
};

export default document;