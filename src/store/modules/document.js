// @flow
import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv4 } from "uuid";

export const documentSlice = createSlice({
  name: "document",
  initialState: {
    documentId: "id1",
    editabale: null,
    title: "Current approaches to knowledge management",
    isShortcuted: false,
    createdAt: "",
    updatedAt: "",
    archivedAt: "",
    level0: ["id2", "id3"],
    level1: [{ id2: ["id4"] }],
    level2: null,
    children: ["id2", "id3"],
    collection: {
      id2: {
        content:
          "- Many technologies for organizing knowledge outside of the brain have arisen in response to these limitations. Physical books and journals proliferated after the invention of the Gutenberg Press, and have since been partially supplanted by word processors, websites, blogs, forums, wikis, and software applications.",
        level: 0,
        previousSibling: null,
        children: ["id4"],
        parent: null
      },
      id3: {
        content:
          "- While we are presented with a plethora of choices for organizing knowledge, almost every technology follows the same basic ‘file cabinet’ format.",
        level: 0,
        previousSibling: "id2",
        children: null,
        parent: null
      },
      id4: {
        content:
          "- To access the information, the user must remember where they stored the file, what they tagged it with, or use a search function to locate it.",
        level: 1,
        previousSibling: null,
        children: null,
        parent: "id2"
      }
    }
  },
  reducers: {
    updateContent: (state, action) => {
      const { id, text } = action.payload;

      return {
        ...state,
        editabale: null,
        collection: {
          ...state.collection,
          [id]: {
            ...state.collection[id],
            content: text
          }
        }
      };
    },
    setEditable: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        editabale: id
      };
    },
    updateTitle: (state, action) => {
      const { title } = action.payload;
      return {
        ...state,
        title: title
      };
    },
    addChild: (state, action) => {
      const { currentId } = action.payload;
      const currentLevel = state.collection[currentId].level;
      const itemId = uuidv4();

      // 1. Create new item with defined props
      const newItem = {
        [itemId]: {
          content: "- New Item",
          level: currentLevel + 1,
          previousSibling: null,
          children: null,
          parent: currentId
        }
      };

      // 2. Update current's first children siblings
      const updatedChildrenSiblings = () => {
        const firstChild = state.collection[currentId].children[0];
        return {
          [firstChild]: {
            ...state.collection[firstChild],
            previousSibling: newItem
          }
        };
      };

      // 3. Update current's children
      const updatedCurrentItem = {
        [currentId]: {
          ...state.collection[currentId],
          children: [itemId, ...state.collection[currentId].children]
        }
      };

      return {
        ...state,
        collection: {
          ...state.collection,
          ...newItem,
          ...updatedChildrenSiblings(),
          ...updatedCurrentItem
        }
      };
    },
    addSibling: (state, action) => {
      const { currentId } = action.payload;
      const parentId = state.collection[currentId].parent;
      const hasParent = parentId !== null;
      const itemId = uuidv4();

      // 1. Create new item with defined props
      const newItem = {
        [itemId]: {
          content: "- New Item",
          level: hasParent ? state.collection[parentId].level : 0,
          previousSibling: currentId,
          children: null,
          parent: hasParent ? parentId : null
        }
      };

      // 2. Update current's parent
      if (hasParent) {
        const updatedParent = {
          [currentId]: {
            ...state.collection[currentId],
            children: [...state.collection[currentId].children]
          }
        };
      }

      return {
        ...state
      };
    },
    addItem: (state, action) => {
      const { parentId } = action.payload;
      const hasChildren = state.collection[parentId].children !== null;
      const itemId = uuidv4();

      const paste = (array, id, itemId) => {
        const updatedArray = [...array];
        const index = updatedArray.indexOf(id);
        updatedArray.splice(index + 1, 0, itemId);
        return updatedArray;
      };

      // Update children props in parentId, add new item with parent = parentId
      if (hasChildren) {
        return {
          ...state,
          editabale: itemId,
          collection: {
            ...state.collection,
            [parentId]: {
              ...state.collection[parentId],
              children: [itemId, ...state.collection[parentId].children]
            },
            [itemId]: {
              content: "- New Item",
              children: null,
              parent: parentId
            }
          }
        };
      }

      const sharedParent = state.collection[parentId].parent;

      // Update children props in sharedParent,
      // add new item with parent = sharedParent
      if (sharedParent) {
        const newarray = paste(
          state.collection[sharedParent].children,
          parentId,
          itemId
        );

        return {
          ...state,
          editabale: itemId,
          collection: {
            ...state.collection,
            [sharedParent]: {
              ...state.collection[sharedParent],
              children: newarray
            },
            [itemId]: {
              content: "- New Item",
              children: null,
              parent: sharedParent
            }
          }
        };
      }

      // Update children props in initial document children,
      // add new item with parent = null
      const newarray = paste(state.children, parentId, itemId);

      return {
        ...state,
        editabale: itemId,
        children: newarray,
        collection: {
          ...state.collection,
          [itemId]: {
            content: "- New Item",
            children: null,
            parent: null
          }
        }
      };
    }
  }
});

export const selectDocumentTitle = state => state.document.title;
export const selectDocumentChildren = state => state.document.children;
export const selectDocumentCollection = state => state.document.collection;
export const selectDocumentEditable = state => state.document.editabale;

export const {
  updateContent,
  addItem,
  setEditable,
  updateTitle,
  addChild
} = documentSlice.actions;
export default documentSlice.reducer;
