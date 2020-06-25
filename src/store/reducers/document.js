import * as actionTypes from '../actions/actionTypes';

const initialState = {
  listByID: {
    id1: {
      parent: null,
      text: 'Managing your time and motivation 1',
      children: ['id3', 'id4', 'id5']
    },
    id2: {
      parent: null,
      text: 'Managing your time and motivation 2',
      children: ['id9', 'id10', 'id11']
    },
    id3: {
      parent: "id1",
      text: 'Nested text',
      children: null
    },
    id4: {
      parent: "id1",
      text: 'Nested text',
      children: null
    },
    id5: {
      parent: "id1",
      text: 'Managing your time and motivation Nested',
      children: ['id6', 'id7', 'id8']
    },
    id6: {
      parent: "id5",
      text: 'Nested text',
      children: null
    },
    id7: {
      parent: "id5",
      text: 'Nested text',
      children: null
    },
    id8: {
      parent: "id5",
      text: 'Nested text',
      children: null
    },
    id9: {
      parent: "id2",
      text: 'Nested text',
      children: null
    },
    id10: {
      parent: "id2",
      text: 'Nested text',
      children: null
    },
    id11: {
      parent: "id2",
      text: 'Nested text',
      children: null
    },
  },
  initialIDList: ['id1', 'id2'],
  isEditable: false
};

/** Delete later */
let generateID = 20;

const document = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_LIST_ITEM:

      /** Edit text */
      if (action.isEdit) {
        return {
          ...state,
          listByID: {
            ...state.listByID,
            [action.parentID]: {
              ...state.listByID[action.parentID],
              text: action.text
            }
          },
          isEditable: false
        };
      }

      const currId = String(generateID++);

      if (action.isChild) {
        const parentChildren = state.listByID[action.parentID].children ?
          [currId, ...state.listByID[action.parentID].children] :
          [currId];

        /** Add as a child of parent in the first position */
        return {
          ...state,
          listByID: {
            ...state.listByID,
            [currId]: {
              text: action.text,
              parent: action.parentID,
              children: null
            },
            [action.parentID]: {
              ...state.listByID[action.parentID],
              children: parentChildren
            }
          },
          isEditable: false
        }
      } else {

        if (state.listByID[action.parentID].parent) {
          // not in initial list
          const parentIndex = state.listByID[state.listByID[action.parentID].parent].children.indexOf(action.parentID);
          const updatedList = [...state.listByID[state.listByID[action.parentID].parent].children];
          updatedList.splice(parentIndex + 1, 0, currId);

          /** Add in specific postion after parent as a sibling */
          return {
            ...state,
            listByID: {
              ...state.listByID,
              [currId]: {
                text: action.text,
                parent: state.listByID[action.parentID].parent,
                children: null
              },
              [state.listByID[action.parentID].parent]: {
                ...state.listByID[state.listByID[action.parentID].parent],
                children: updatedList
              }
            },
            isEditable: false
          }

        } else {
          // initial list
          const parentIndex = state.initialIDList.indexOf(action.parentID);
          const updatedInitialList = [...state.initialIDList];
          updatedInitialList.splice(parentIndex + 1, 0, currId);

          /** Add in specific postion after parent as a sibling */
          return {
            ...state,
            listByID: {
              ...state.listByID,
              [currId]: {
                text: action.text,
                parent: null,
                children: null
              },
            },
            initialIDList: updatedInitialList,
            isEditable: false
          }
        }
      }
    case actionTypes.SET_DOCUMENT_EDITABLE:
      return {
        ...state,
        isEditable: action.isEditable
      }
    default:
      return state;
  }
};

export default document;