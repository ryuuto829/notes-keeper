// @flow
import { createSlice } from "@reduxjs/toolkit";
import {
  createArrayCopy,
  addChildAfter,
  addChildBefore,
  removeChild,
  getLastNode,
  changeParent,
  removeFromCollection
} from "../../utils/document";
import type { DocumentStore } from "../../types/DocumentStore";

type State = {
  document: DocumentStore
};

export const documentSlice = createSlice({
  name: "document",
  initialState: {
    editable: null,
    collection: {
      initial: {
        children: null,
        level: 0
      }
    }
  },
  reducers: {
    splitItem: (state: DocumentStore, action) => {
      const { currentId, splitAt, newItemId } = action.payload;
      const parentId = state.collection[currentId].parent;

      const remainContent = state.collection[currentId].content.substring(
        splitAt
      );
      const newContent = state.collection[currentId].content.substring(
        0,
        splitAt
      );

      const addedChild = addChildBefore(
        state.collection[parentId].children,
        currentId,
        newItemId
      );

      return {
        ...state,
        collection: {
          ...state.collection,
          [parentId]: {
            ...state.collection[parentId],
            children: addedChild
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
    mergeItem: (state: DocumentStore, action) => {
      const { currentId } = action.payload;
      const parentId = state.collection[currentId].parent;
      const parentChildren = state.collection[parentId].children;

      // If its first child and has own children then do nothing
      if (
        parentChildren[0] === currentId &&
        state.collection[currentId].children
      ) {
        return state;
      }

      const updatedState = removeFromCollection(state, currentId);

      // If first child has no children then merge with parent
      if (parentChildren[0] === currentId) {
        const removedChild = removeChild(parentChildren, currentId);

        return {
          ...state,
          editable: parentId,
          collection: {
            ...updatedState,
            [parentId]: {
              ...state.collection[parentId],
              content:
                state.collection[parentId].content +
                state.collection[currentId].content,
              children: removedChild
            }
          }
        };
      }

      const prevSiblingIndex =
        state.collection[parentId].children.indexOf(currentId) - 1;
      const prevSibling = state.collection[parentId].children[prevSiblingIndex];

      const removedChild = removeChild(
        state.collection[parentId].children,
        currentId
      );

      // Merge with last node of previous sibling's children
      if (state.collection[prevSibling].children) {
        const prevNode = getLastNode(state, prevSibling);

        return {
          ...state,
          editable: prevNode,
          collection: {
            ...updatedState,
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

      // Merge with previous sibling
      const updatedChildren = changeParent(
        state,
        state.collection[currentId].children,
        prevSibling
      );

      return {
        ...state,
        editable: prevSibling,
        collection: {
          ...updatedState,
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
          },
          ...updatedChildren
        }
      };
    },
    moveDown: (state: DocumentStore, action) => {
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
    moveUp: (state: DocumentStore, action) => {
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
    addItem: (state: DocumentStore, action) => {
      const { currentId, newItemId } = action.payload;
      const { children, level, parent } = state.collection[currentId];

      // if current item has children then add new item as first child
      if (children !== null) {
        const addedChild = createArrayCopy(children);
        if (addedChild) addedChild.unshift(newItemId);

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
    updateContent: (state: DocumentStore, action) => {
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
    setEditable: (state: DocumentStore, action) => {
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
    },
    initiateDocument: (state, action) => {
      const { id } = action.payload;

      return {
        ...state,
        collection: {
          ...state.collection,
          initial: {
            children: [id],
            level: 0
          },
          [id]: {
            content: "",
            children: null,
            parent: "initial",
            level: 1
          }
        }
      };
    }
  }
});

export const selectDocumentTitle = (state: State) => state.document.title;
export const selectDocumentCollection = (state: State) =>
  state.document.collection;
export const selectDocumentEditable = (state: State) => state.document.editable;
export const selectDocumentId = (state: State) => state.document.documentId;

export const {
  setEditable,
  removeEditable,
  moveUp,
  moveDown,
  mergeItem,
  splitItem,
  updateContent,
  addItem,
  updateTitle,
  initiateDocument
} = documentSlice.actions;
export default documentSlice.reducer;
