import {
  ADD_LIST_ITEM,
  EDIT_LIST_ITEM,
  DELETE_LIST_ITEM,
  SET_DOCUMENT_EDITABLE,
  RESET_DOCUMENT_EDITABLE
} from '../actions/actionTypes';

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

const addListItem = (state, { text, parentID, isChild }) => {
  const currId = 'id-' + String(generateID++);

  if (isChild) {
    const parentChildren = state.listByID[parentID].children ?
      [currId, ...state.listByID[parentID].children] :
      [currId];

    /** Add as a child of parent in the first position */
    return {
      ...state,
      listByID: {
        ...state.listByID,
        [currId]: {
          text: text,
          parent: parentID,
          children: null
        },
        [parentID]: {
          ...state.listByID[parentID],
          children: parentChildren
        }
      }
    };
  } else {

    if (state.listByID[parentID].parent) {
      // not in initial list
      const parentIndex = state.listByID[state.listByID[parentID].parent].children.indexOf(parentID);
      const updatedList = [...state.listByID[state.listByID[parentID].parent].children];
      updatedList.splice(parentIndex + 1, 0, currId);

      /** Add in specific postion after parent as a sibling */
      return {
        ...state,
        listByID: {
          ...state.listByID,
          [currId]: {
            text: text,
            parent: state.listByID[parentID].parent,
            children: null
          },
          [state.listByID[parentID].parent]: {
            ...state.listByID[state.listByID[parentID].parent],
            children: updatedList
          }
        }
      };
    } else {
      // initial list
      const parentIndex = state.initialIDList.indexOf(parentID);
      const updatedInitialList = [...state.initialIDList];
      updatedInitialList.splice(parentIndex + 1, 0, currId);

      /** Add in specific postion after parent as a sibling */
      return {
        ...state,
        listByID: {
          ...state.listByID,
          [currId]: {
            text: text,
            parent: null,
            children: null
          },
        },
        initialIDList: updatedInitialList
      }
    }
  };
};

const editListItem = (state, { parentID, text }) => ({
  ...state,
  listByID: {
    ...state.listByID,
    [parentID]: {
      ...state.listByID[parentID],
      text: text
    }
  }
});

const setEditable = (state, { id }) => {
  return {
    ...state,
    isEditable: id
  };
};

const resetEditable = state => {
  return {
    ...state,
    isEditable: null
  };
};

const deleteListItem = (state, { id }) => {
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
  const itemChildren = state.listByID[id].children;
  const indexToDelete = findChildrenIdexToDelete(itemChildren, state.listByID, [id]);

  const updatedListID = Object.keys(state.listByID).filter(itemID => {
    return !indexToDelete.includes(itemID)
  });

  /** List with ID that need to remain */
  const updatedList = {};
  updatedListID.forEach(itemID => {
    updatedList[itemID] = state.listByID[itemID];
  });

  /** Update state if has or no parents */
  if (state.listByID[id].parent !== null) {
    const parentIndex = state.listByID[state.listByID[id].parent].children.indexOf(id);
    const updatedListChildren = [...state.listByID[state.listByID[id].parent].children];
    updatedListChildren.splice(parentIndex, 1);

    return {
      ...state,
      listByID: {
        ...updatedList,
        [state.listByID[id].parent]: {
          ...state.listByID[state.listByID[id].parent],
          children: updatedListChildren.length === 0 ? null : updatedListChildren
        }
      }
    };

  } else {
    const parentIndexInitial = state.initialIDList.indexOf(id);
    const updatedListChildrenInitial = [...state.initialIDList];
    updatedListChildrenInitial.splice(parentIndexInitial, 1);

    return {
      ...state,
      listByID: {
        ...updatedList
      },
      initialIDList: updatedListChildrenInitial.length === 0 ? null : updatedListChildrenInitial
    };
  }
};

const document = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_ITEM: return addListItem(state, action);
    case EDIT_LIST_ITEM: return editListItem(state, action);
    case DELETE_LIST_ITEM: return deleteListItem(state, action);
    case SET_DOCUMENT_EDITABLE: return setEditable(state, action);
    case RESET_DOCUMENT_EDITABLE: return resetEditable(state);
    default:
      return state;
  }
};

export default document;