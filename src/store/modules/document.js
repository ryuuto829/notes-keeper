// @flow
import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv4 } from "uuid";

export const documentSlice = createSlice({
  name: "document",
  initialState: {
    documentId: "id1",
    editable: null,
    title: "Current approaches to knowledge management",
    isShortcuted: false,
    createdAt: "",
    updatedAt: "",
    archivedAt: "",
    children: ["id2", "id3"],
    collection: {
      id1: {
        children: ["id2", "id3"],
        level: 0
      },
      id2: {
        content:
          "- Many technologies for organizing knowledge outside of the brain have arisen in response to these limitations. Physical books and journals proliferated after the invention of the Gutenberg Press, and have since been partially supplanted by word processors, websites, blogs, forums, wikis, and software applications.",
        children: ["id4", "id5"],
        parent: "id1",
        nextNode: "id4",
        level: 1
      },
      id3: {
        content:
          "- While we are presented with a plethora of choices for organizing knowledge, almost every technology follows the same basic ‘file cabinet’ format.",
        children: null,
        parent: "id1",
        nextNode: null,
        level: 1
      },
      id4: {
        content:
          "- To access the information, the user must remember where they stored the file, what they tagged it with, or use a search function to locate it.",
        children: null,
        parent: "id2",
        nextNode: "id5",
        level: 2
      },
      id5: {
        content:
          "- To access the information, the user must remember where they stored the file, what they tagged it with, or use a search function to locate it.",
        children: ["id6"],
        parent: "id2",
        nextNode: "id6",
        level: 2
      },
      id6: {
        content:
          "- To access the information, the user must remember where they stored the file, what they tagged it with, or use a search function to locate it.",
        children: null,
        parent: "id5",
        nextNode: "id3",
        level: 3
      }
    }
  },
  reducers: {
    splitItem: (state, action) => {
      const { currentId, splitAt } = action.payload;
      const newItemId = uuidv4();
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

      // if its first child and has own children -> do nothing
      if (
        state.collection[parentId].children[0] === currentId &&
        state.collection[currentId].children
      ) {
        return state;
      }

      if (state.collection[parentId].children[0] === currentId) {
        let removeChild = [...state.collection[parentId].children];
        removeChild.splice(
          state.collection[parentId].children.indexOf(currentId),
          1
        );
        if (removeChild.length === 0) {
          removeChild = null;
        }

        return {
          ...state,
          collection: {
            ...state.collection,
            [parentId]: {
              ...state.collection[parentId],
              content:
                state.collection[parentId].content +
                state.collection[currentId].content,
              children: removeChild
            }
          }
        };
      }

      const prevSiblingIndex =
        state.collection[parentId].children.indexOf(currentId) - 1;
      const prevSibling = state.collection[parentId].children[prevSiblingIndex];

      const removeChild = [...state.collection[parentId].children];
      removeChild.splice(
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
              children: removeChild
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
            children: removeChild
          }
        }
      };
    },
    moveDown: (state, action) => {
      const { currentId } = action.payload;

      const parentId = state.collection[currentId].parent;

      // If 'Tab' on first child -> nothing happens
      if (state.collection[parentId].children[0] === currentId) return state;

      const prevSiblingIndex =
        state.collection[parentId].children.indexOf(currentId) - 1;
      const prevSibling = state.collection[parentId].children[prevSiblingIndex];

      const removeChild = [...state.collection[parentId].children];
      removeChild.splice(
        state.collection[parentId].children.indexOf(currentId),
        1
      );

      let addChild;
      if (state.collection[prevSibling].children) {
        addChild = [...state.collection[prevSibling].children];
        addChild.push(currentId);
      } else {
        addChild = [currentId];
      }

      return {
        ...state,
        collection: {
          ...state.collection,
          // 1. Add new parent
          [currentId]: {
            ...state.collection[currentId],
            parent: prevSibling
          },
          // 2. Add child to sibling
          [prevSibling]: {
            ...state.collection[prevSibling],
            children: addChild
          },
          // 3. Delete child from parent
          [parentId]: {
            ...state.collection[parentId],
            children: removeChild
          }
        }
      };
    },
    moveUp: (state, action) => {
      const { currentId } = action.payload;
      const parentId = state.collection[currentId].parent;
      const sharedId = state.collection[parentId].parent;

      const removeChild = [...state.collection[parentId].children];
      removeChild.splice(
        state.collection[parentId].children.indexOf(currentId),
        1
      );

      const addChild = [...state.collection[sharedId].children];
      addChild.splice(
        state.collection[sharedId].children.indexOf(parentId) + 1,
        0,
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
            children: removeChild
          },
          // 2. Add to shared parent children
          [sharedId]: {
            ...state.collection[sharedId],
            children: addChild
          },
          // 3. change parent of current
          [currentId]: {
            ...state.collection[currentId],
            parent: sharedId
          }
        }
      };
    },
    addItem: (state, action) => {
      const { currentId } = action.payload;
      const hasChildren = state.collection[currentId].children !== null;
      const newItemId = uuidv4();

      if (hasChildren) {
        // Add children
        const addChild = [...state.collection[currentId].children];
        addChild.unshift(newItemId);

        return {
          ...state,
          editable: newItemId,
          collection: {
            ...state.collection,
            // 1. Create new item
            [newItemId]: {
              content: "---",
              children: null,
              parent: currentId,
              level: state.collection[currentId].level + 1
            },
            // 2. Add new children to parent
            [currentId]: {
              ...state.collection[currentId],
              children: addChild
            }
          }
        };
      }

      const addChild = [
        ...state.collection[state.collection[currentId].parent].children
      ];
      addChild.splice(
        state.collection[state.collection[currentId].parent].children.indexOf(
          currentId
        ) + 1,
        0,
        newItemId
      );

      return {
        ...state,
        editable: newItemId,
        collection: {
          ...state.collection,
          // 1. Create new item
          [newItemId]: {
            content: "---",
            children: null,
            parent: state.collection[currentId].parent,
            level: state.collection[currentId].level
          },
          // 2. Add new children to parent of current
          [state.collection[currentId].parent]: {
            ...state.collection[state.collection[currentId].parent],
            children: addChild
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
export const selectDocumentChildren = state => state.document.children;
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
  updateTitle,
  addChild
} = documentSlice.actions;
export default documentSlice.reducer;
