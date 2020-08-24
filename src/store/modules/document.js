// @flow
import { createSlice } from "@reduxjs/toolkit";
import {
  createArrayCopy,
  addChildAfter,
  addChildBefore,
  removeChild
} from "../../utils/document";
import { DOCUMENT_DATA } from "./_test_database"; // initial state, DELETE LATER

export const documentSlice = createSlice({
  name: "document",
  initialState: DOCUMENT_DATA,
  reducers: {
    splitItem: (state, action) => {
      const { currentId, splitAt, newItemId } = action.payload;
      const parentId = state.collection[currentId].parent;

      const remainContent = state.collection[currentId].content.substring(
        splitAt
      );
      const newContent = state.collection[currentId].content.substring(
        0,
        splitAt
      );

      const addChild = [...state.collection[parentId].children];
      addChild.splice(
        state.collection[parentId].children.indexOf(currentId),
        0,
        newItemId
      );

      return {
        ...state,
        collection: {
          ...state.collection,
          [parentId]: {
            ...state.collection[parentId],
            children: addChild
          },
          [newItemId]: {
            content: newContent,
            children: null,
            parent: parentId,
            level: state.collection[currentId].level
          },
          [currentId]: {
            ...state.collection[currentId],
            content: remainContent
          }
        }
      };
    },
    mergeItem: (state, action) => {
      const { currentId } = action.payload;
      const parentId = state.collection[currentId].parent;
      const parentChildren = state.collection[parentId].children;

      // if its first child and has own children -> do nothing
      if (parentChildren[0] === currentId && parentChildren) {
        return state;
      }

      if (parentChildren[0] === currentId) {
        const removedChild = removeChild(parentChildren, currentId);

        return {
          ...state,
          collection: {
            ...state.collection,
            [parentId]: {
              ...state.collection[parentId],
              content:
                state.collection[parentId].content +
                state.collection[currentId].content,
              // children: removeChild
              children: removedChild
            }
          }
        };
      }

      const prevSiblingIndex =
        state.collection[parentId].children.indexOf(currentId) - 1;
      const prevSibling = state.collection[parentId].children[prevSiblingIndex];

      const removedChild = [...state.collection[parentId].children];
      removedChild.splice(
        state.collection[parentId].children.indexOf(currentId),
        1
      );

      if (state.collection[prevSibling].children) {
        const getLastNode = id => {
          if (state.collection[id].children !== null) {
            const index = state.collection[id].children.length - 1;
            return getLastNode(state.collection[id].children[index]);
          }
          return id;
        };

        const prevNode = getLastNode(prevSibling);

        return {
          ...state,
          editable: prevNode,
          collection: {
            ...state.collection,
            [parentId]: {
              ...state.collection[parentId],
              children: removedChild
            },
            [prevNode]: {
              ...state.collection[prevNode],
              content:
                state.collection[prevNode].content +
                state.collection[currentId].content
            }
          }
        };
      }

      return {
        ...state,
        collection: {
          ...state.collection,
          [prevSibling]: {
            ...state.collection[prevSibling],
            content:
              state.collection[prevSibling].content +
              state.collection[currentId].content,
            children: state.collection[currentId].children
          },
          [parentId]: {
            ...state.collection[parentId],
            children: removedChild
          }
        }
      };
    },
    moveDown: (state, action) => {
      const { currentId } = action.payload;
      const parentId = state.collection[currentId].parent;
      const parentChildren = state.collection[parentId].children;

      // If 'Tab' on first child -> nothing happens
      if (parentChildren[0] === currentId) return state;

      // Find id of the previous sibling
      const prevSiblingIndex = parentChildren.indexOf(currentId) - 1;
      const prevSibling = parentChildren[prevSiblingIndex];

      const removedChild = removeChild(parentChildren, currentId);

      const addedChild = createArrayCopy(
        state.collection[prevSibling].children
      );
      if (addedChild) addedChild.push(currentId);

      return {
        ...state,
        collection: {
          ...state.collection,
          // 1. Add new parent
          [currentId]: {
            ...state.collection[currentId],
            level: state.collection[prevSibling].level + 1,
            parent: prevSibling
          },
          // 2. Add child to sibling
          [prevSibling]: {
            ...state.collection[prevSibling],
            children: addedChild || [currentId]
          },
          // 3. Delete child from parent
          [parentId]: {
            ...state.collection[parentId],
            children: removedChild
          }
        }
      };
    },
    moveUp: (state, action) => {
      const { currentId } = action.payload;
      const parentId = state.collection[currentId].parent;
      const sharedId = state.collection[parentId].parent;

      const removedChild = removeChild(
        state.collection[parentId].children,
        currentId
      );

      const addedChild = addChildAfter(
        state.collection[sharedId].children,
        parentId,
        currentId
      );

      return {
        ...state,
        editable: currentId,
        collection: {
          ...state.collection,
          // 1. Delete child from the parent
          [parentId]: {
            ...state.collection[parentId],
            children: removedChild
          },
          // 2. Add to shared parent children
          [sharedId]: {
            ...state.collection[sharedId],
            children: addedChild
          },
          // 3. Change parent of current
          [currentId]: {
            ...state.collection[currentId],
            level: state.collection[sharedId].level + 1,
            parent: sharedId
          }
        }
      };
    },
    addItem: (state, action) => {
      const { currentId, newItemId } = action.payload;
      const { children, level, parent } = state.collection[currentId];
      const hasChildren = state.collection[currentId].children !== null;

      // if current item has children then add new item as first child
      if (hasChildren) {
        const addedChild = createArrayCopy(children);
        addedChild.unshift(newItemId);

        return {
          ...state,
          editable: newItemId,
          collection: {
            ...state.collection,
            // 1. Create new item
            [newItemId]: {
              content: "",
              children: null,
              parent: currentId,
              level: level + 1
            },
            // 2. Add new child to parent
            [currentId]: {
              ...state.collection[currentId],
              children: addedChild
            }
          }
        };
      }

      // If current item has no children then add sibling after it
      const addedChild = addChildAfter(
        state.collection[parent].children,
        currentId,
        newItemId
      );

      return {
        ...state,
        editable: newItemId,
        collection: {
          ...state.collection,
          // 1. Create new item
          [newItemId]: {
            content: "",
            children: null,
            parent: parent,
            level: level
          },
          // 2. Add new child to parent of current
          [parent]: {
            ...state.collection[parent],
            children: addedChild
          }
        }
      };
    },
    updateContent: (state, action) => {
      const { currentId, text } = action.payload;

      return {
        ...state,
        collection: {
          ...state.collection,
          [currentId]: {
            ...state.collection[currentId],
            content: text
          }
        }
      };
    },
    setEditable: (state, action) => {
      const { id } = action.payload;

      return {
        ...state,
        editable: id
      };
    },
    removeEditable: (state, action) => {
      return {
        ...state,
        editable: null
      };
    }
  }
});

export const selectDocumentTitle = state => state.document.title;
export const selectDocumentCollection = state => state.document.collection;
export const selectDocumentEditable = state => state.document.editable;

export const {
  setEditable,
  removeEditable,
  moveUp,
  moveDown,
  mergeItem,
  splitItem,
  updateContent,
  addItem,
  updateTitle
} = documentSlice.actions;
export default documentSlice.reducer;
