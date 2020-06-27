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
  isEditable: null
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
          }
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
          }
        };
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
            }
          };
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
            initialIDList: updatedInitialList
          }
        }
      };
    case actionTypes.SET_DOCUMENT_EDITABLE:
      return {
        ...state,
        isEditable: action.isEditable
      };
    case actionTypes.RESET_DOCUMENT_EDITABLE:
      return {
        ...state,
        isEditable: null
      };
    case actionTypes.DELETE_LIST_ITEM:
      const findChildrenIdexToDelete = (listOfChildrens = null, fullList, resultArray = []) => {
        if (listOfChildrens) {
          listOfChildrens.map(item => {
            resultArray.push(item);
            if (fullList[item].children) {
              findChildrenIdexToDelete(fullList[item].children, fullList, resultArray);
            }
          });
        }
        return resultArray;
      };

      /** Find list of IDs to delete from store */
      const itemChildren = state.listByID[action.id].children;
      const indexToDelete = findChildrenIdexToDelete(itemChildren, state.listByID, [action.id]);

      const updatedListID = Object.keys(state.listByID).filter(itemID => {
        return !indexToDelete.includes(itemID)
      });

      /** List with ID that need to remain */
      const updatedList = {};
      updatedListID.forEach(itemID => {
        updatedList[itemID] = state.listByID[itemID];
      });

      /** Update state if has or no parents */
      if (state.listByID[action.id].parent !== null) {
        const parentIndex = state.listByID[state.listByID[action.id].parent].children.indexOf(action.id);
        const updatedListChildren = [...state.listByID[state.listByID[action.id].parent].children];
        updatedListChildren.splice(parentIndex, 1);

        return {
          ...state,
          listByID: {
            ...updatedList,
            [state.listByID[action.id].parent]: {
              ...state.listByID[state.listByID[action.id].parent],
              children: updatedListChildren || null
            }
          }
        };

      } else {
        const parentIndexInitial = state.initialIDList.indexOf(action.id);
        const updatedListChildrenInitial = [...state.initialIDList];
        updatedListChildrenInitial.splice(parentIndexInitial, 1);

        return {
          ...state,
          listByID: {
            ...updatedList
          },
          initialIDList: updatedListChildrenInitial || null
        };
      }
    default:
      return state;
  }
};

export default document;